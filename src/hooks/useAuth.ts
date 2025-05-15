'use client';

import { useEffect, useState, useCallback } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { useApi } from './useApi';
import Cookies from 'js-cookie';

interface VerifyResponse {
    status: boolean;
    message?: string;
}

// Cache for verification status
const verificationCache = {
    token: '',
    isValid: false,
    expiry: 0,
    isVerifying: false
};

export function useAuth() {
    const [token, setToken] = useState<string | undefined>(undefined);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const { get } = useApi();

    useEffect(() => {
        const checkToken = async () => {
            const token = Cookies.get('token');
            if (!token) {
                setToken(undefined);
                setIsAuthenticated(false);
                if (pathname.startsWith('/dashboard')) {
                    router.push('/login');
                }
                return;
            }
            setToken(token);
            setIsAuthenticated(true);
        };

        checkToken();
    }, [pathname, router]);

    const login = useCallback(async (token: string) => {
        const response = await get<VerifyResponse>('/verify', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            cache: 'no-store'
        });

        const isValid = response?.data?.status || false;
        if (!isValid) {
            return false;
        }

        Cookies.set('token', token, {
            expires: 1, // 1 day
            path: '/',
            sameSite: 'strict'
        });

        setToken(token);
        setIsAuthenticated(true);
        return true;
    }, []);

    const logout = useCallback(() => {
        Cookies.remove('token', { path: '/' });
        setToken(undefined);
        setIsAuthenticated(false);
        // Clear verification cache
        verificationCache.token = '';
        verificationCache.isValid = false;
        verificationCache.expiry = 0;
    }, []);

    return {
        isAuthenticated,
        setIsAuthenticated,
        token,
        login,
        logout
    };
}
