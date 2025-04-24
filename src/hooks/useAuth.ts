'use client';

import { useCookies } from 'react-cookie';

export function useAuth() {
  const [cookies] = useCookies(['token']);
  const isAuthenticated = !!cookies.token;

  return {
    isAuthenticated,
    token: cookies.token
  };
} 