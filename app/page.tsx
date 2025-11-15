'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/inbox');
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">📧</div>
        <p className="text-gray-600">Przekierowywanie do panelu pracowników...</p>
      </div>
    </div>
  );
}
