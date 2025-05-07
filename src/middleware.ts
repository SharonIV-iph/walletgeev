import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const tokenCache = new Map<string, { isValid: boolean; expiry: number }>();

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPrivatePath = path.startsWith('/dashboard');
    const isAuthPath = path === '/login' || path === '/signup';
    const token = request.cookies.get('token')?.value || '';

    // Skip middleware for RSC requests if not a private path
    if (request.nextUrl.searchParams.has('_rsc') && !isPrivatePath) {
        return NextResponse.next();
    }

    // Handle private paths (dashboard)
    if (isPrivatePath) {
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        // Check token cache first
        const cached = tokenCache.get(token);
        const now = Date.now();

        if (cached && cached.isValid && cached.expiry > now) {
            const response = NextResponse.next();
            response.cookies.set('token', token, {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
                path: '/',
                sameSite: 'strict'
            });
            return response;
        }

        try {
            const verifyResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                cache: 'no-store',
                credentials: 'include'
            });

            if (!verifyResponse.ok) {
                throw new Error('Token verification failed');
            }

            const data = await verifyResponse.json();

            if (!data['status']) {
                throw new Error('Invalid token');
            }

            // Cache the valid token
            tokenCache.set(token, {
                isValid: true,
                expiry: now + 5 * 60 * 1000 // 5 minutes cache
            });

            // Set the token cookie again to ensure it's properly set
            const nextResponse = NextResponse.next();
            nextResponse.cookies.set('token', token, {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
                path: '/',
                sameSite: 'strict'
            });
            return nextResponse;
        } catch (error) {
            // Clear invalid token from cache and cookies
            tokenCache.delete(token);
            const response = NextResponse.redirect(new URL('/login', request.url));
            response.cookies.delete('token');
            return response;
        }
    }

    // Handle auth paths (login/signup)
    if (isAuthPath && token) {
        try {
            const verifyResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                cache: 'no-store',
                credentials: 'include'
            });

            if (verifyResponse.ok) {
                const data = await verifyResponse.json();
                if (data['status']) {
                    return NextResponse.redirect(new URL('/dashboard', request.url));
                }
            }
        } catch (error) {
            // If verification fails, clear the token and continue to login
            const response = NextResponse.next();
            response.cookies.delete('token');
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|public).*)']
};
