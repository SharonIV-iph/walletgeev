import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


const tokenCache = new Map<string, { isValid: boolean; expiry: number }>()

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPrivatePath = path.startsWith('/dashboard')
  const isAuthPath = path === '/login' || path === '/signup'
  const token = request.cookies.get('token')?.value || ''

  
  if (isPrivatePath && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  
  if (isAuthPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  
  if (isPrivatePath && token) {
    
    const cached = tokenCache.get(token)
    const now = Date.now()

    if (cached && cached.isValid && cached.expiry > now) {
      
      return NextResponse.next()
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()

      if (!data['status']) {
        throw new Error('Invalid token')
      }

      
      tokenCache.set(token, {
        isValid: true,
        expiry: now + 5 * 60 * 1000, 
      })

      return NextResponse.next()
    } catch (error) {
      
      tokenCache.delete(token)
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}