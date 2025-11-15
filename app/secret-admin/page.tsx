'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { useInboxStore } from '@/lib/store';
import { MESSAGE_VARIANTS } from '@/lib/variants';
import { Message, MessageVariant } from '@/lib/types';
import { MESSAGE_TEMPLATES } from '@/lib/templates';
import { DEFAULT_PROMPTS, BASE_PROMPT } from '@/lib/prompts';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const [step, setStep] = useState<'input' | 'editing' | 'sent'>('input');
  const [keyPoints, setKeyPoints] = useState('');
  const [subject, setSubject] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentMessage, setCurrentMessage] = useState<Message | null>(null);
  const [editedVariants, setEditedVariants] = useState<Record<MessageVariant, string>>({} as Record<MessageVariant, string>);
  const [activeVariant, setActiveVariant] = useState<MessageVariant>('base');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [showPromptEditor, setShowPromptEditor] = useState(false);
  const [customPrompts, setCustomPrompts] = useState<Record<MessageVariant, string>>(DEFAULT_PROMPTS);
  const [customBasePrompt, setCustomBasePrompt] = useState<string>(BASE_PROMPT);
  const [useAsBase, setUseAsBase] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { addMessage, sendMessage } = useInboxStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');

    try {
      const response = await fetch('/api/admin-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        setPassword('');
      } else {
        setAuthError('Nieprawidłowe hasło');
      }
    } catch (err) {
      setAuthError('Błąd logowania');
    } finally {
      setAuthLoading(false);
    }
  };

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🔒</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Panel Administratora
              </h1>
              <p className="text-gray-600">
                Wprowadź hasło aby kontynuować
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {authError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {authError}
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Hasło
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  placeholder="Wprowadź hasło..."
                  autoFocus
                  required
                />
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold transition-colors"
              >
                {authLoading ? 'Sprawdzanie...' : 'Zaloguj się'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/inbox" className="text-sm text-gray-600 hover:text-gray-900">
                ← Powrót do panelu pracowników
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleTemplateSelect = (templateId: string) => {
    const template = MESSAGE_TEMPLATES.find(t => t.id === templateId);
    if (template) {
      setSubject(template.subject);
      setKeyPoints(template.content);
      setSelectedTemplate(templateId);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setKeyPoints(text);
        setSelectedTemplate('');
      };
      reader.readAsText(file);
    }
  };

  const handleGenerate = async () => {
    if (!keyPoints.trim() || !subject.trim()) {
      setError('Proszę wypełnić wszystkie pola');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/generate-variants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keyPoints,
          customPrompts,
          basePrompt: customBasePrompt,
          useAsBase,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate variants');
      }

      const data = await response.json();

      const message: Message = {
        id: `msg-${Date.now()}`,
        subject,
        keyPoints,
        baseContent: data.baseContent,
        variants: data.variants,
        timestamp: new Date(),
        sent: false,
      };

      setCurrentMessage(message);
      setEditedVariants(data.variants);
      addMessage(message);
      setStep('editing');
    } catch (err: any) {
      setError(err.message || 'Wystąpił błąd podczas generowania wariantów');
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!currentMessage) return;

    try {
      setLoading(true);

      // Update variants with edited content
      const updatedMessage = {
        ...currentMessage,
        variants: editedVariants,
      };

      await sendMessage(updatedMessage.id);
      setStep('sent');
    } catch (err: any) {
      setError(err.message || 'Wystąpił błąd podczas wysyłania wiadomości');
    } finally {
      setLoading(false);
    }
  };

  const handleEditVariant = (variant: MessageVariant, content: string) => {
    setEditedVariants(prev => ({
      ...prev,
      [variant]: content,
    }));
  };

  if (step === 'sent') {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Wiadomość wysłana!
            </h2>
            <p className="text-gray-600 mb-6">
              Komunikat został wysłany do wszystkich pracowników w ich preferowanych wariantach.
            </p>
            <div className="space-x-4">
              <button
                onClick={() => {
                  setStep('input');
                  setKeyPoints('');
                  setSubject('');
                  setCurrentMessage(null);
                  setEditedVariants({} as Record<MessageVariant, string>);
                }}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Wyślij kolejny komunikat
              </button>
              <Link
                href="/inbox"
                className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Zobacz skrzynki pracowników
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'editing' && currentMessage) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edycja wariantów</h1>
              <p className="text-gray-600">Temat: {currentMessage.subject}</p>
            </div>
            <button
              onClick={handleSend}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
            >
              📤 Wyślij do wszystkich
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Variant selector */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow p-4 sticky top-8">
                <h3 className="font-semibold text-gray-900 mb-3">Warianty komunikatu</h3>
                <div className="space-y-2">
                  {MESSAGE_VARIANTS.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setActiveVariant(variant.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        activeVariant === variant.id
                          ? 'bg-indigo-100 border-2 border-indigo-500'
                          : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="text-2xl mr-2">{variant.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-gray-900 truncate">
                            {variant.name}
                          </div>
                          <div className="text-xs text-gray-500 truncate">
                            {variant.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Editor */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">
                      {MESSAGE_VARIANTS.find(v => v.id === activeVariant)?.icon}{' '}
                      {MESSAGE_VARIANTS.find(v => v.id === activeVariant)?.name}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {editedVariants[activeVariant]?.length || 0} znaków
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {MESSAGE_VARIANTS.find(v => v.id === activeVariant)?.description}
                  </p>
                </div>
                <textarea
                  value={editedVariants[activeVariant] || ''}
                  onChange={(e) => handleEditVariant(activeVariant, e.target.value)}
                  className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm text-gray-900"
                  placeholder="Treść wariantu..."
                />
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-900">
                    💡 <strong>Podgląd:</strong> Ten wariant trafi do pracowników preferujących ten styl komunikacji.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Prompt Editor Modal
  const PromptEditorModal = () => {
    if (!showPromptEditor) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">⚙️ Edytor promptów AI</h2>
              <button
                onClick={() => setShowPromptEditor(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Dostosuj prompty dla każdego wariantu. Użyj <code className="bg-gray-100 px-1 rounded">{'{baseContent}'}</code> jako placeholder dla bazowej treści.
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🔹 Prompt bazowy (generuje pierwszą wersję)
              </label>
              <textarea
                value={customBasePrompt}
                onChange={(e) => setCustomBasePrompt(e.target.value)}
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm text-gray-900"
                placeholder="Użyj {keyPoints} jako placeholder"
              />
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-semibold text-gray-900 mb-4">Prompty dla wariantów</h3>
              <div className="space-y-4">
                {MESSAGE_VARIANTS.map((variant) => (
                  <div key={variant.id}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {variant.icon} {variant.name}
                      <span className="text-gray-500 font-normal ml-2 text-xs">
                        ({variant.description})
                      </span>
                    </label>
                    <textarea
                      value={customPrompts[variant.id]}
                      onChange={(e) => setCustomPrompts(prev => ({
                        ...prev,
                        [variant.id]: e.target.value
                      }))}
                      className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm text-gray-900"
                      placeholder={`Prompt dla wariantu ${variant.name}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-gray-200 flex justify-between">
            <button
              onClick={() => {
                setCustomPrompts(DEFAULT_PROMPTS);
                setCustomBasePrompt(BASE_PROMPT);
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold"
            >
              🔄 Resetuj do domyślnych
            </button>
            <button
              onClick={() => setShowPromptEditor(false)}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold"
            >
              ✅ Zapisz i zamknij
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <PromptEditorModal />
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/inbox" className="text-indigo-600 hover:text-indigo-700 text-sm">
            ← Powrót do panelu pracowników
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6 flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Panel Komunikatora
              </h1>
              <p className="text-gray-600">
                Wprowadź kluczowe informacje, a AI wygeneruje 15 spersonalizowanych wariantów komunikatu.
              </p>
            </div>
            <button
              onClick={() => setShowPromptEditor(!showPromptEditor)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-semibold"
            >
              ⚙️ Edytuj prompty AI
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <div className="space-y-6">
            {/* Template selector and file upload */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  📋 Wybierz szablon
                </label>
                <select
                  value={selectedTemplate}
                  onChange={(e) => handleTemplateSelect(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                >
                  <option value="">-- Wybierz gotowy szablon --</option>
                  {MESSAGE_TEMPLATES.map(template => (
                    <option key={template.id} value={template.id}>
                      {template.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  📁 Lub wgraj plik tekstowy
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors text-gray-700 font-semibold"
                >
                  Kliknij aby wybrać plik .txt
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Temat wiadomości
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="np. Nowa polityka pracy zdalnej"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Kluczowe informacje do przekazania
              </label>
              <textarea
                value={keyPoints}
                onChange={(e) => setKeyPoints(e.target.value)}
                placeholder={useAsBase ? "Wklej tutaj gotowy email, który zostanie użyty jako bazowy (bez zmian)..." : "Opisz co chcesz zakomunikować, np.:\n- Od stycznia 2025 nowa polityka pracy zdalnej\n- 3 dni w biurze, 2 dni zdalnie\n- Elastyczne godziny pracy 7:00-10:00\n- Szczegóły w intranecie"}
                className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
              />
              <div className="mt-2 flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="useAsBase"
                    checked={useAsBase}
                    onChange={(e) => setUseAsBase(e.target.checked)}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="useAsBase" className="text-sm font-medium text-gray-700 cursor-pointer">
                    📧 Użyj tego tekstu jako gotowego emaila (bez zmian)
                  </label>
                </div>
                <p className="text-sm text-gray-500 text-right">
                  {selectedTemplate && '✅ Załadowano szablon'}
                </p>
              </div>
              {useAsBase ? (
                <p className="mt-2 text-sm text-blue-600 bg-blue-50 border border-blue-200 rounded p-2">
                  💡 Ten tekst zostanie użyty bezpośrednio jako bazowa wersja - AI wygeneruje tylko warianty stylowe.
                </p>
              ) : (
                <p className="mt-2 text-sm text-gray-500">
                  Im więcej szczegółów podasz, tym lepsze będą wygenerowane warianty.
                </p>
              )}
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold text-lg transition-colors"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Generowanie wariantów...
                </span>
              ) : (
                '✨ Wygeneruj warianty komunikatu'
              )}
            </button>
          </div>

          <div className="mt-8 p-6 bg-indigo-50 rounded-lg">
            <h3 className="font-semibold text-indigo-900 mb-3">
              Co się stanie po kliknięciu?
            </h3>
            <ol className="space-y-2 text-sm text-indigo-800">
              <li className="flex items-start">
                <span className="font-semibold mr-2">1.</span>
                <span>AI wygeneruje tekst bazowy na podstawie Twoich informacji</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">2.</span>
                <span>Stworzy 12 wariantów dopasowanych do różnych preferencji</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">3.</span>
                <span>Będziesz mógł przejrzeć i edytować każdy wariant</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">4.</span>
                <span>Po zatwierdzeniu - wyślesz spersonalizowane wersje do wszystkich pracowników</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
