import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('vygrid_admin_session');
  const { pathname } = request.nextUrl;
  
  // Protect all sub-paths under /admin/dashboard
  if (pathname.startsWith('/admin/dashboard')) {
    if (!session || session.value !== 'vygrid-active-session-token-2026') {
      const loginUrl = new URL('/admin', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  // Redirect logged-in admin away from login page to dashboard
  if (pathname === '/admin' && session?.value === 'vygrid-active-session-token-2026') {
    const dashboardUrl = new URL('/admin/dashboard', request.url);
    return NextResponse.redirect(dashboardUrl);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/dashboard/:path*'],
};
