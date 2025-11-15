'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useInboxStore } from '@/lib/store';
import { MESSAGE_VARIANTS } from '@/lib/variants';
import { Message, MessageVariant } from '@/lib/types';

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
        body: JSON.stringify({ keyPoints }),
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

  const handleSend = () => {
    if (!currentMessage) return;

    // Update variants with edited content
    const updatedMessage = {
      ...currentMessage,
      variants: editedVariants,
    };

    sendMessage(updatedMessage.id);
    setStep('sent');
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

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/inbox" className="text-indigo-600 hover:text-indigo-700 text-sm">
            ← Powrót do panelu pracowników
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Panel Komunikatora
            </h1>
            <p className="text-gray-600">
              Wprowadź kluczowe informacje, a AI wygeneruje 12 spersonalizowanych wariantów komunikatu.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <div className="space-y-6">
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
                placeholder="Opisz co chcesz zakomunikować, np.:&#10;- Od stycznia 2025 nowa polityka pracy zdalnej&#10;- 3 dni w biurze, 2 dni zdalnie&#10;- Elastyczne godziny pracy 7:00-10:00&#10;- Szczegóły w intranecie"
                className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
              />
              <p className="mt-2 text-sm text-gray-500">
                Im więcej szczegółów podasz, tym lepsze będą wygenerowane warianty.
              </p>
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
