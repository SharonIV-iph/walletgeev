'use client';

import { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

import Cookies from 'js-cookie';

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
        setIsAuthenticated(true);
    };

    const logout = () => {
        Cookies.remove('token', { path: '/' });
        setToken(undefined);
        setIsAuthenticated(false);
    };

    return {
        isAuthenticated,
        setIsAuthenticated,
        token,
        login,
        logout
    };
}
