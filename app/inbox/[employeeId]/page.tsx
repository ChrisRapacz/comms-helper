'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { useInboxStore } from '@/lib/store';
import { getEmployeeById } from '@/lib/personas';
import { Email } from '@/lib/types';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import Link from 'next/link';
import Image from 'next/image';
import { getVariantConfig } from '@/lib/variants';
import { useParams } from 'next/navigation';
import { DEFAULT_PROMPTS } from '@/lib/prompts';

export default function EmployeeInboxPage() {
  const params = useParams();
  const employeeId = params.employeeId as string;
  const employee = useMemo(() => getEmployeeById(employeeId), [employeeId]);
  const { getEmployeeEmails, markEmailAsRead, fetchData } = useInboxStore();

  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [showOriginalModal, setShowOriginalModal] = useState(false);
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [showMobileEmailView, setShowMobileEmailView] = useState(false);
  const emails = getEmployeeEmails(employeeId);

  // Refs to preserve scroll position in modals during re-renders
  const preferencesScrollRef = useRef<HTMLDivElement>(null);
  const originalScrollRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef({ preferences: 0, original: 0 });

  // Fetch data from server on mount and set up polling
  useEffect(() => {
    fetchData(); // Initial fetch

    // Poll for new messages every 5 seconds
    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(interval);
  }, [fetchData]);

  // Handle clicks on links in email body
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A') {
        const href = target.getAttribute('href');
        if (href?.startsWith('#view-original')) {
          e.preventDefault();
          setShowOriginalModal(true);
        } else if (href?.startsWith('#change-preferences')) {
          e.preventDefault();
          setShowPreferencesModal(true);
        }
      }
    };

    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, []);

  // Preserve scroll position in modals during polling re-renders
  useEffect(() => {
    // Restore scroll position for preferences modal
    if (showPreferencesModal && preferencesScrollRef.current) {
      preferencesScrollRef.current.scrollTop = scrollPositionRef.current.preferences;
    }
    // Restore scroll position for original modal
    if (showOriginalModal && originalScrollRef.current) {
      originalScrollRef.current.scrollTop = scrollPositionRef.current.original;
    }
  });

  // Save scroll position on scroll
  const handlePreferencesScroll = () => {
    if (preferencesScrollRef.current) {
      scrollPositionRef.current.preferences = preferencesScrollRef.current.scrollTop;
    }
  };

  const handleOriginalScroll = () => {
    if (originalScrollRef.current) {
      scrollPositionRef.current.original = originalScrollRef.current.scrollTop;
    }
  };

  if (!employee) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Nie znaleziono pracownika
          </h1>
          <Link href="/inbox" className="text-indigo-600 hover:text-indigo-700">
            ← Powrót do wyboru pracownika
          </Link>
        </div>
      </div>
    );
  }

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
    setShowMobileEmailView(true);
    if (!email.read) {
      markEmailAsRead(employeeId, email.id);
    }
  };

  const handleBackToList = () => {
    setShowMobileEmailView(false);
  };

  const unreadCount = emails.filter(e => !e.read).length;
  const variantConfig = getVariantConfig(employee.preferredVariant);

  // Original Message Modal
  const OriginalMessageModal = () => {
    if (!showOriginalModal || !selectedEmail?.originalContent) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">📄 Oryginalna wiadomość</h2>
              <button
                onClick={() => setShowOriginalModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Tak wyglądała wiadomość przed dopasowaniem do Twoich preferencji
            </p>
          </div>

          <div
            ref={originalScrollRef}
            onScroll={handleOriginalScroll}
            className="flex-1 overflow-y-auto overflow-x-hidden p-6 max-w-full"
          >
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 max-w-full overflow-x-hidden">
              <h3 className="font-semibold text-gray-900 mb-4 break-words">{selectedEmail.subject}</h3>
              <div className="whitespace-pre-wrap text-gray-800 leading-relaxed break-words overflow-wrap-anywhere max-w-full">
                {selectedEmail.originalContent}
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-gray-200 flex justify-end">
            <button
              onClick={() => setShowOriginalModal(false)}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold"
            >
              Zamknij
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Preferences Modal
  const PreferencesModal = () => {
    if (!showPreferencesModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">⚙️ Twoje preferencje komunikacyjne</h2>
              <button
                onClick={() => setShowPreferencesModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
          </div>

          <div
            ref={preferencesScrollRef}
            onScroll={handlePreferencesScroll}
            className="flex-1 overflow-y-auto overflow-x-hidden p-6 space-y-6 max-w-full"
          >
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200 max-w-full overflow-x-hidden">
              <div className="flex items-start space-x-4 max-w-full">
                <span className="text-4xl flex-shrink-0">{variantConfig?.icon}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-blue-900 mb-2 break-words">
                    {variantConfig?.name}
                  </h3>
                  <p className="text-blue-700 mb-4 break-words">
                    {variantConfig?.description}
                  </p>
                  <div className="bg-white bg-opacity-50 rounded p-3 text-sm text-blue-900 break-words">
                    <strong>Twój profil:</strong> {employee.persona}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 max-w-full">
              <h4 className="font-semibold text-gray-900 break-words">📋 Szczegóły dopasowania:</h4>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm text-gray-700 max-w-full overflow-x-hidden">
                <p className="break-words"><strong>Pokolenie:</strong> {employee.generation}</p>
                <p className="break-words"><strong>Opis preferencji:</strong> {employee.description}</p>
              </div>
            </div>

            <div className="space-y-3 max-w-full">
              <h4 className="font-semibold text-gray-900 break-words">🤖 Instrukcje AI dla Twojego wariantu:</h4>
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 max-w-full overflow-x-hidden">
                <p className="text-sm text-indigo-900 mb-2 font-semibold break-words">
                  Następujący prompt jest używany przez AI do generowania wiadomości w Twoim stylu:
                </p>
                <div className="bg-white rounded p-4 text-sm text-gray-700 font-mono whitespace-pre-wrap border border-indigo-100 break-words overflow-wrap-anywhere max-w-full">
                  {DEFAULT_PROMPTS[employee.preferredVariant]}
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-full overflow-x-hidden">
              <p className="text-sm text-yellow-900 break-words">
                <strong>💡 Informacja:</strong> To jest funkcja demonstracyjna. W rzeczywistej implementacji
                możesz tutaj umieścić formularz do zmiany preferencji komunikacyjnych.
              </p>
            </div>
          </div>

          <div className="p-6 border-t border-gray-200 flex justify-end">
            <button
              onClick={() => setShowPreferencesModal(false)}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold"
            >
              Zamknij
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden max-w-full">
      <OriginalMessageModal />
      <PreferencesModal />
      {/* Gmail-like header */}
      <header className="bg-white border-b border-gray-200 px-3 md:px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gmail-red rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg md:text-xl">M</span>
              </div>
              <span className="text-lg md:text-xl text-gray-700 font-normal hidden sm:inline">Mail Demo</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="flex items-center space-x-2 md:space-x-3">
              <span className="text-xs md:text-sm text-gray-700 truncate max-w-[120px] md:max-w-none">{employee.fullName}</span>
              <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                <Image
                  src={employee.avatarUrl}
                  alt={employee.fullName}
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-64px)] overflow-x-hidden max-w-full">
        {/* Sidebar - hidden on mobile */}
        <div className="hidden md:flex md:w-64 bg-white border-r border-gray-200 flex-col">
          <div className="p-4">
            <button className="w-full flex items-center space-x-3 px-6 py-3 bg-gmail-blue text-white rounded-full hover:shadow-md transition-shadow">
              <span className="text-xl">✏️</span>
              <span className="font-semibold">Nowa wiadomość</span>
            </button>
          </div>

          <nav className="flex-1 px-2">
            <div className="space-y-1">
              <div className="flex items-center space-x-3 px-4 py-2 bg-red-50 text-red-700 rounded-r-full font-semibold">
                <span className="text-xl">📥</span>
                <span>Odebrane</span>
                {unreadCount > 0 && (
                  <span className="ml-auto text-sm">{unreadCount}</span>
                )}
              </div>
              <div className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-r-full cursor-pointer">
                <span className="text-xl">⭐</span>
                <span>Oznaczone gwiazdką</span>
              </div>
              <div className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-r-full cursor-pointer">
                <span className="text-xl">📤</span>
                <span>Wysłane</span>
              </div>
              <div className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-r-full cursor-pointer">
                <span className="text-xl">📝</span>
                <span>Wersje robocze</span>
              </div>
            </div>
          </nav>

          <div className="p-4 border-t border-gray-200">
            <Link
              href="/inbox"
              className="block text-center text-sm text-indigo-600 hover:text-indigo-700"
            >
              ← Zmień pracownika
            </Link>
          </div>
        </div>

        {/* Email list and content container */}
        <div className="flex-1 flex overflow-x-hidden max-w-full">
          {/* Email list - full width on mobile (hidden when email is open), half width on desktop */}
          <div className={`${showMobileEmailView ? 'hidden md:flex' : 'flex'} w-full md:w-1/2 bg-white md:border-r border-gray-200 overflow-y-auto flex-col`}>
            {/* Mobile: Back to employee selection */}
            <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3">
              <Link
                href="/inbox"
                className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center space-x-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Zmień pracownika</span>
              </Link>
            </div>

            {/* Preference banner */}
            <div className="bg-blue-50 border-b border-blue-200 p-3 md:p-4 max-w-full overflow-x-hidden flex-shrink-0">
              <div className="flex items-start space-x-2 md:space-x-3 max-w-full">
                <span className="text-xl md:text-2xl flex-shrink-0">{variantConfig?.icon}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm md:text-base font-semibold text-blue-900 break-words">
                    Twoja preferencja: {variantConfig?.name}
                  </h3>
                  <p className="text-xs md:text-sm text-blue-700 break-words">
                    {employee.description}
                  </p>
                  <button
                    onClick={() => setShowPreferencesModal(true)}
                    className="mt-2 text-xs md:text-sm text-indigo-600 hover:text-indigo-800 font-semibold underline break-words"
                  >
                    🤖 Zobacz instrukcje AI dla tego wariantu
                  </button>
                </div>
              </div>
            </div>

            {/* Email list */}
            <div className="divide-y divide-gray-200">
              {emails.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <span className="text-6xl mb-4 block">📭</span>
                  <p>Brak wiadomości w skrzynce</p>
                </div>
              ) : (
                emails.map((email) => (
                  <button
                    key={email.id}
                    onClick={() => handleEmailClick(email)}
                    className={`w-full text-left p-3 md:p-4 hover:shadow-md transition-all overflow-hidden ${
                      selectedEmail?.id === email.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                    } ${!email.read ? 'bg-white' : 'bg-gray-50'}`}
                  >
                    <div className="flex items-start space-x-2 md:space-x-3 max-w-full">
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${!email.read ? 'bg-blue-600' : 'bg-transparent'}`} />
                      <div className="flex-1 min-w-0 overflow-hidden">
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-1 gap-1">
                          <span className={`font-semibold text-gray-900 break-words ${!email.read ? 'font-bold' : ''}`}>
                            {email.fromName}
                          </span>
                          <span className="text-xs text-gray-500 flex-shrink-0 sm:ml-2">
                            {format(new Date(email.timestamp), 'd MMM', { locale: pl })}
                          </span>
                        </div>
                        <p className={`text-sm break-words line-clamp-1 ${!email.read ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                          {email.subject}
                        </p>
                        <p className="text-xs md:text-sm text-gray-600 line-clamp-2 break-words mt-1 overflow-wrap-anywhere text-justify">
                          {email.body.replace(/<[^>]*>/g, '').substring(0, 100)}...
                        </p>
                        {email.variant && !email.isDemo && (
                          <div className="mt-2">
                            <span className="inline-block px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs break-words">
                              {variantConfig?.icon} Dopasowano do Twoich preferencji
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Email content - full width on mobile (only when email is selected), half width on desktop */}
          <div className={`${!showMobileEmailView && selectedEmail ? 'hidden md:flex' : showMobileEmailView ? 'flex' : 'hidden md:flex'} flex-1 bg-white overflow-y-auto overflow-x-hidden max-w-full flex-col`}>
            {selectedEmail ? (
              <div className="flex flex-col h-full">
                {/* Mobile back button */}
                <div className="md:hidden sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center space-x-3 z-10">
                  <button
                    onClick={handleBackToList}
                    className="text-gray-700 hover:text-gray-900"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <span className="text-sm font-semibold text-gray-900 truncate">
                    {selectedEmail.subject}
                  </span>
                </div>

                <div className="p-4 md:p-8 flex-1 overflow-y-auto overflow-x-hidden max-w-full">
                  <div className="mb-6 max-w-full">
                    <h1 className="text-base md:text-2xl font-bold text-gray-900 mb-4 break-words">
                      {selectedEmail.subject}
                    </h1>
                  <div className="flex items-start space-x-3 md:space-x-4 pb-4 border-b border-gray-200 max-w-full overflow-x-hidden">
                    {!selectedEmail.isDemo && selectedEmail.from === 'internalcomms@chrisrapacz.com' ? (
                      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src="https://chrisrapacz.com/img/profile2.png"
                          alt="Chris Rapacz"
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                        {selectedEmail.fromName.charAt(0)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col gap-1">
                        <div className="font-semibold text-gray-900 break-words">
                          {selectedEmail.fromName}
                        </div>
                        <div className="text-sm text-gray-600 break-all">
                          {selectedEmail.from}
                        </div>
                        <div className="text-xs md:text-sm text-gray-500 mt-1">
                          {format(new Date(selectedEmail.timestamp), 'd MMMM yyyy, HH:mm', {
                            locale: pl,
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedEmail.variant && !selectedEmail.isDemo && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg max-w-full overflow-x-hidden">
                    <div className="flex items-start space-x-2 max-w-full">
                      <span className="text-xl flex-shrink-0">{variantConfig?.icon}</span>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-green-900 break-words">
                          Ta wiadomość została dostosowana do Twoich preferencji
                        </h3>
                        <p className="text-sm text-green-700 mt-1 break-words">
                          Format: <strong>{variantConfig?.name}</strong> - {variantConfig?.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="max-w-full overflow-x-hidden">
                  <div
                    className="whitespace-pre-wrap text-gray-800 leading-relaxed break-words overflow-wrap-anywhere text-justify max-w-full"
                    dangerouslySetInnerHTML={{ __html: selectedEmail.body }}
                  />
                </div>

                {/* Button to view preferences (alternative to link in disclaimer) */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setShowPreferencesModal(true)}
                    className="text-sm text-indigo-600 hover:text-indigo-700"
                  >
                    ℹ️ Zobacz dlaczego otrzymałeś tę wersję wiadomości
                  </button>
                </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <span className="text-6xl mb-4 block">📧</span>
                  <p>Wybierz wiadomość aby zobaczyć jej treść</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
