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

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
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

        <footer className="mt-12 text-center text-sm text-gray-600">
          Zrobione przez{' '}
          <a
            href="https://www.linkedin.com/in/krzysztofrapacz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 font-semibold"
          >
            Chris Rapacz
          </a>
        </footer>
      </div>
    </div>
  );
}
