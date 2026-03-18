import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Moduler approach: Extract configuration arrays
const PUBLIC_ROUTES = ['/auth'];
const PUBLIC_API_ROUTES = ['/api/auth'];
const STATIC_PREFIXES = ['/_next'];

function isPublicRoute(pathname: string): boolean {
  return (
    PUBLIC_ROUTES.some((route) => pathname.startsWith(route)) ||
    PUBLIC_API_ROUTES.some((route) => pathname.startsWith(route))
  );
}

function isStaticAsset(pathname: string): boolean {
  return (
    pathname.includes('.') ||
    STATIC_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  );
}

export function proxy(request: NextRequest) {
  const authToken = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  if (isPublicRoute(pathname) || isStaticAsset(pathname)) {
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
