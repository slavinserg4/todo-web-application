'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [message, setMessage] = useState('Завантаження...');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHello = async () => {
      try {
        const response = await fetch('http://localhost:5334/hello');
        const data = await response.json();
        setMessage(data.message);

      } catch (err) {
        setError('Помилка при з\'єднанні з сервером');
        console.error('Помилка:', err);
      }
    };

    fetchHello().catch();
  }, []);

  return (
      <main className="min-h-screen flex flex-col items-center justify-center p-24">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
          <h1 className="text-4xl font-bold mb-4 text-center">
            Тестова сторінка
          </h1>

          {error ? (
              <div className="text-red-500 text-center">
                {error}
              </div>
          ) : (
              <div className="text-2xl text-center">
                {message}
              </div>
          )}
        </div>
      </main>
  );
}