import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Comms Helper
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Demonstracja personalizacji komunikacji firmowej z AI
          </p>
          <p className="text-sm text-gray-500 italic">
            "Jeden rozmiar pasuje do nikogo: Jak AI pomaga mówić językiem każdego pracownika"
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Admin Panel Card */}
          <Link href="/admin">
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow cursor-pointer border-2 border-transparent hover:border-indigo-500">
              <div className="text-6xl mb-4">👨‍💼</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Panel Komunikatora
              </h2>
              <p className="text-gray-600 mb-4">
                Stwórz komunikat firmowy i wygeneruj spersonalizowane wersje dla różnych preferencji pracowników.
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Wprowadź kluczowe informacje</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Wygeneruj 12 wariantów automatycznie</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Edytuj i wyślij do wszystkich</span>
                </div>
              </div>
              <div className="mt-6 text-indigo-600 font-semibold">
                Rozpocznij komunikację →
              </div>
            </div>
          </Link>

          {/* Employee Panel Card */}
          <Link href="/inbox">
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow cursor-pointer border-2 border-transparent hover:border-green-500">
              <div className="text-6xl mb-4">📧</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Skrzynka Pracownika
              </h2>
              <p className="text-gray-600 mb-4">
                Zaloguj się jako jeden z pracowników i zobacz wiadomości dopasowane do Twoich preferencji komunikacyjnych.
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>12 różnych person pracowników</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Interfejs podobny do Gmail</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Wiadomości dopasowane do preferencji</span>
                </div>
              </div>
              <div className="mt-6 text-green-600 font-semibold">
                Otwórz skrzynkę →
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-12 text-center text-sm text-gray-500">
          <p>
            Demo stworzone do prezentacji: <br />
            <span className="font-semibold">
              "Jeden rozmiar pasuje do nikogo: Jak AI pomaga mówić językiem każdego pracownika"
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
