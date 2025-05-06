'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function LogoutPage() {
    const router = useRouter();
    const { isAuthenticated, logout, setIsAuthenticated } = useAuth();
    useEffect(() => {
        const logout_ = async () => {
            // Here you can add any logout logic like clearing tokens, etc.
            // For now, we'll just wait for 2 seconds to show the loading message

            logout();
            setIsAuthenticated(false);

            await new Promise(resolve => setTimeout(resolve, 1000));
            router.push('/');
        };

        logout_();
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">در حال خروج...</p>
            </div>
        </div>
    );
}
