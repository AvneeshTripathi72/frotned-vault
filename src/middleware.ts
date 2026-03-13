import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/auth') || 
    pathname.startsWith('/api/auth') ||
    pathname.includes('.') || 
    pathname.startsWith('/_next')
  ) {
    return NextResponse.next();
  }

  if (!authToken) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
