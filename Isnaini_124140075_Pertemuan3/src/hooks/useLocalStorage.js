import { useEffect, useState } from 'react';

// Membaca data awal dari localStorage, lalu menyimpan setiap perubahan.
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Data tidak bisa disimpan:', error);
    }
  }, [key, value]);

  return [value, setValue];
}