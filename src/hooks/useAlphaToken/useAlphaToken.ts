// This hook is used to grab the alpha token from cookies
'use client';

import { useEffect, useState } from 'react';

export const useAlphaToken = () => {
  const [alphaToken, setAlphaToken] = useState<string | null>(null);

  useEffect(() => {
    const cookies = document.cookie.split('; ');
    console.log('Cookies:', cookies);
    const alphaCookie = cookies.find((cookie) =>
      cookie.match('alpha-token')
    );
    if (alphaCookie) {
      const token = alphaCookie.split('=')[1];
      setAlphaToken(token);
    }
    return () => setAlphaToken(null);
  }, []);

  return alphaToken;
};
