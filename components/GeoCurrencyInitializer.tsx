'use client';

import { useEffect } from 'react';

export default function GeoCurrencyInitializer() {
  useEffect(() => {
    const alreadySet = document.cookie.includes('preferred_currency=');
    if (alreadySet) return;

    // Use client-side GeoIP service
    fetch('https://ipapi.co/json/')
      .then((res) => res.json())
      .then((data) => {
        const currency = data.country_code === 'IN' ? 'INR' : 'USD';
        document.cookie = `preferred_currency=${currency}; path=/; max-age=604800`; // 7 days
      });
  }, []);

  return null;
}