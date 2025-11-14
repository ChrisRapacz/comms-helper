'use client';

import { use, useState, useMemo } from 'react';
import { useInboxStore } from '@/lib/store';
import { getEmployeeById } from '@/lib/personas';
import { Email } from '@/lib/types';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import Link from 'next/link';
import Image from 'next/image';
import { getVariantConfig } from '@/lib/variants';

export default function EmployeeInboxPage({
  params,
}: {
  params: Promise<{ employeeId: string }>;
}) {
  const { employeeId } = use(params);
  const employee = useMemo(() => getEmployeeById(employeeId), [employeeId]);
  const { getEmployeeEmails, markEmailAsRead } = useInboxStore();

  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const emails = getEmployeeEmails(employeeId);

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
    if (!email.read) {
      markEmailAsRead(employeeId, email.id);
    }
  };

  const unreadCount = emails.filter(e => !e.read).length;
  const variantConfig = getVariantConfig(employee.preferredVariant);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Gmail-like header */}
      <header className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gmail-red rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-xl text-gray-700 font-normal">Mail Demo</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-700">{employee.fullName}</span>
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

      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
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

        {/* Email list */}
        <div className="flex-1 flex">
          <div className="w-1/2 bg-white border-r border-gray-200 overflow-y-auto">
            {/* Preference banner */}
            <div className="bg-blue-50 border-b border-blue-200 p-4">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">{variantConfig?.icon}</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-900">
                    Twoja preferencja: {variantConfig?.name}
                  </h3>
                  <p className="text-sm text-blue-700">
                    {employee.description}
                  </p>
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
                    className={`w-full text-left p-4 hover:shadow-md transition-all ${
                      selectedEmail?.id === email.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                    } ${!email.read ? 'bg-white' : 'bg-gray-50'}`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${!email.read ? 'bg-blue-600' : 'bg-transparent'}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between mb-1">
                          <span className={`font-semibold text-gray-900 truncate ${!email.read ? 'font-bold' : ''}`}>
                            {email.fromName}
                          </span>
                          <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                            {format(new Date(email.timestamp), 'd MMM', { locale: pl })}
                          </span>
                        </div>
                        <p className={`text-sm truncate ${!email.read ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                          {email.subject}
                        </p>
                        <p className="text-sm text-gray-600 truncate mt-1">
                          {email.body.substring(0, 100)}...
                        </p>
                        {email.variant && !email.isDemo && (
                          <div className="mt-2">
                            <span className="inline-block px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs">
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

          {/* Email content */}
          <div className="flex-1 bg-white overflow-y-auto">
            {selectedEmail ? (
              <div className="p-8">
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    {selectedEmail.subject}
                  </h1>
                  <div className="flex items-start space-x-4 pb-4 border-b border-gray-200">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {selectedEmail.fromName.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <div className="font-semibold text-gray-900">
                            {selectedEmail.fromName}
                          </div>
                          <div className="text-sm text-gray-600">
                            {selectedEmail.from}
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {format(new Date(selectedEmail.timestamp), 'd MMMM yyyy, HH:mm', {
                            locale: pl,
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedEmail.variant && !selectedEmail.isDemo && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <span className="text-xl">{variantConfig?.icon}</span>
                      <div>
                        <h3 className="font-semibold text-green-900">
                          Ta wiadomość została dostosowana do Twoich preferencji
                        </h3>
                        <p className="text-sm text-green-700 mt-1">
                          Format: <strong>{variantConfig?.name}</strong> - {variantConfig?.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="prose max-w-none">
                  <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                    {selectedEmail.body}
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
