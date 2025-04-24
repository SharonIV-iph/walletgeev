'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { usePathname } from 'next/navigation';

export function useAuth() {
  const [token, setToken] = useState<string | undefined>(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();
  
  useEffect(() => {
    const token = Cookies.get('token');
    setToken(token);
    setIsAuthenticated(!!token);
  }, [pathname]);



  const login = (token: string) => {
    Cookies.set('token', token, { 
      expires: 1, // 1 day
      path: '/',
      sameSite: 'strict'
    });
    setToken(token);
  };

  const logout = () => {
    Cookies.remove('token', { path: '/' });
    setToken(undefined);
  };

  return {
    isAuthenticated,
    token,
    login,
    logout
  };
} 