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

    const verifyToken = useCallback(async (token: string): Promise<boolean> => {
        // Check cache first
        if (verificationCache.token === token &&
            verificationCache.isValid &&
            verificationCache.expiry > Date.now()) {
            return true;
        }

        // If already verifying, wait for the result
        if (verificationCache.isVerifying) {
            return false;
        }

        try {
            verificationCache.isVerifying = true;
            const response = await get<VerifyResponse>('/verify', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                cache: 'no-store'
            });

            const isValid = response?.data?.status || false;

            // Update cache
            verificationCache.token = token;
            verificationCache.isValid = isValid;
            verificationCache.expiry = Date.now() + (5 * 60 * 1000); // 5 minutes cache
            verificationCache.isVerifying = false;

            return isValid;
        } catch (error) {
            verificationCache.isVerifying = false;
            return false;
        }
    }, [get]);

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

            const isValid = await verifyToken(token);
            if (!isValid) {
                // Clear invalid token
                Cookies.remove('token', { path: '/' });
                setToken(undefined);
                setIsAuthenticated(false);
                if (pathname.startsWith('/dashboard')) {
                    router.push('/login');
                }
                return;
            }

            // Re-set the token to ensure it persists
            Cookies.set('token', token, {
                expires: 1, // 1 day
                path: '/',
                sameSite: 'strict'
            });

            setToken(token);
            setIsAuthenticated(true);
        };

        checkToken();
    }, [pathname, router, verifyToken]);

    const login = useCallback(async (token: string) => {
        const isValid = await verifyToken(token);
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
    }, [verifyToken]);

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
