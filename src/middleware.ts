import { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

const authMiddleware = auth((req) => {
  const session = req.auth;

  if (!session) {
    return NextResponse.redirect(new URL('signin', req.url));
  } else {
    return;
  }
});

const publicPages = ['/signin'];
export default function middleware(request: NextRequest, context: any) {
  const isPublicPage = publicPages.includes(request.nextUrl.pathname);
  if (isPublicPage) {
    return;
  }
  return authMiddleware(request, context);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
