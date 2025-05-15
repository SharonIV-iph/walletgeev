import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { jwtDecode } from 'jwt-decode';

const tokenCache = new Map<string, { isValid: boolean; expiry: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface TokenVerificationResult {
    isValid: boolean;
    error?: string;
}

interface JWTPayload {
    exp: number;
}

function getTokenExpiry(token: string): number {
    try {
        const decoded = jwtDecode<JWTPayload>(token);
        const expTime = decoded.exp * 1000; // Convert to milliseconds
        const now = Date.now();
        const timeUntilExp = expTime - now;

        // If token expires in less than 5 minutes, use that time
        if (timeUntilExp > 0 && timeUntilExp < CACHE_DURATION) {
            return timeUntilExp;
        }
        return CACHE_DURATION;
    } catch {
        return CACHE_DURATION;
    }
}

async function verifyToken(token: string): Promise<TokenVerificationResult> {
    try {
        const verifyResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            cache: 'no-store',
            credentials: 'include'
        });
        if (!verifyResponse.ok) {
            return { isValid: false, error: 'Token verification failed' };
        }

        const data = await verifyResponse.json();
        const isValid = data?.status || false;
        if (!isValid) {
            return { isValid: false, error: 'Invalid token' };
        }
        return { isValid: true };
    } catch (error) {
        return { isValid: false, error: 'Token verification error' };
    }
}

function updateTokenCache(token: string, isValid: boolean) {
    const now = Date.now();
    const expiryDuration = getTokenExpiry(token);
    tokenCache.set(token, {
        isValid,
        expiry: now + expiryDuration
    });
}

function clearToken(response: NextResponse) {
    response.cookies.delete('token');
    return response;
}

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPrivatePath = path.startsWith('/dashboard');
    const isAuthPath = path === '/login' || path === '/signup';
    const token = request.cookies.get('token')?.value || '';

    if (!isAuthPath && !isPrivatePath) {
        return NextResponse.next();
    }

    // Handle private paths (dashboard)
    if (isPrivatePath) {
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        const cached = tokenCache.get(token);
        const now = Date.now();

        if (!cached || cached.expiry <= now) {
            const verificationResult = await verifyToken(token);

            if (!verificationResult.isValid) {
                tokenCache.delete(token);
                return clearToken(NextResponse.redirect(new URL('/login', request.url)));
            }

            updateTokenCache(token, true);
        }
        console.log('Token verified');
        return NextResponse.next();
    }

    // Handle auth paths (login/signup)
    if (isAuthPath) {
        if (!token) {
            return NextResponse.next();
        }

        const cached = tokenCache.get(token);
        const now = Date.now();

        if (!cached || cached.expiry <= now) {
            const verificationResult = await verifyToken(token);

            if (!verificationResult.isValid) {
                tokenCache.delete(token);
                return clearToken(NextResponse.next());
            }

            updateTokenCache(token, true);
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }

        if (cached.expiry > now) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|public).*)']
};
