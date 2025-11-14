'use client';

import { useInboxStore } from '@/lib/store';
import { Employee } from '@/lib/types';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function InboxLoginPage() {
  const { employees, setCurrentEmployee } = useInboxStore();
  const router = useRouter();

  const handleSelectEmployee = (employee: Employee) => {
    setCurrentEmployee(employee);
    router.push(`/inbox/${employee.id}`);
  };

  const generationColors: Record<string, string> = {
    'Boomer': 'bg-purple-100 text-purple-800',
    'Gen X': 'bg-blue-100 text-blue-800',
    'Millennial': 'bg-green-100 text-green-800',
    'Gen Z': 'bg-yellow-100 text-yellow-800',
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-indigo-600 hover:text-indigo-700 text-sm">
            ← Powrót do strony głównej
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Skrzynka Pracownika
          </h1>
          <p className="text-gray-600">
            Wybierz jednego z pracowników, aby zobaczyć jego skrzynkę odbiorczą z wiadomościami dopasowanymi do jego preferencji.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((employee) => (
            <button
              key={employee.id}
              onClick={() => handleSelectEmployee(employee)}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all p-6 text-left border-2 border-transparent hover:border-indigo-500"
            >
              <div className="flex items-start space-x-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                  <Image
                    src={employee.avatarUrl}
                    alt={employee.fullName}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg text-gray-900 truncate">
                    {employee.fullName}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {employee.persona}
                  </p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${generationColors[employee.generation]}`}>
                    {employee.generation}
                  </span>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-600 line-clamp-2">
                {employee.description}
              </p>
              <div className="mt-4 text-indigo-600 text-sm font-semibold">
                Otwórz skrzynkę →
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 p-6 bg-white rounded-lg shadow">
          <h3 className="font-semibold text-gray-900 mb-4">
            Legenda preferencji komunikacyjnych
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${generationColors['Boomer']}`}>
                Boomer
              </span>
              <p className="mt-2 text-gray-600">Szczegółowe, formalne komunikaty</p>
            </div>
            <div>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${generationColors['Gen X']}`}>
                Gen X
              </span>
              <p className="mt-2 text-gray-600">Zwięzłe, praktyczne podejście</p>
            </div>
            <div>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${generationColors['Millennial']}`}>
                Millennial
              </span>
              <p className="mt-2 text-gray-600">Strukturalne, współpracujące</p>
            </div>
            <div>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${generationColors['Gen Z']}`}>
                Gen Z
              </span>
              <p className="mt-2 text-gray-600">Wizualne, konkretne, szybkie</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
