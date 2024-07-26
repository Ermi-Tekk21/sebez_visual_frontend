import { NextRequest, NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';

const roleRoutes = ['/admin', '/user', '/artist'];
const protectedRoutes = [...roleRoutes];
const authRoutes = ['/auth'];

interface AuthUser {
  id: string;
  username: string;
  email: string;
  role: string;
}


export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const cookieStore = request.cookies;
  const accessToken = cookieStore.get('token');
  
  const accessTokenValue = accessToken ? accessToken.value : null;

const authUser: AuthUser | null = accessTokenValue ? jwtDecode<AuthUser>(accessTokenValue) : null;

  const isAuthPath = authRoutes.some(route => pathname.startsWith(route));
  const isRolePath = roleRoutes.some(route => pathname.startsWith(route));
  const isProtectedPath = protectedRoutes.some(route => pathname.startsWith(route));

  if (authUser && authUser.role) {
    const userRolePath = `/${authUser.role.toLowerCase()}`;
    

    if (isRolePath && !pathname.startsWith(userRolePath)) {
      const currentPath = pathname.replace(new RegExp(roleRoutes.join("|")), userRolePath);
      if (roleRoutes.includes(currentPath)) {
        return NextResponse.redirect(new URL(currentPath, request.url));
      }
      return NextResponse.redirect(new URL('/', request.url));
    }

    if (isAuthPath) {
      return NextResponse.redirect(new URL(userRolePath, request.url));
    }
  } else if (isProtectedPath) {

    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt).*)',
  ],
};
