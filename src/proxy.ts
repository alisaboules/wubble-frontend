import { NextResponse, type NextRequest } from "next/server";
import { USER_PAGE } from "@/config/user-page.config";
import { PUBLIC_PAGE } from "@/config/public-page.config";
import { protectUser } from "@/server-actions/middleware/protect-user.middleware";
import { protectLoginPages } from "@/server-actions/middleware/protect-login.middleware";

const PROTECTED = [USER_PAGE.DASHBOARD, USER_PAGE.MONITOR, USER_PAGE.PROFILE];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log('proxy', pathname)
  if (PROTECTED.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return protectUser(request);
  }

  if (pathname === PUBLIC_PAGE.AUTH || pathname.startsWith(`${PUBLIC_PAGE.AUTH}/`)) {
    return protectLoginPages(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/monitor/:path*',
    '/profile/:path*',
    '/auth/:path*',
  ],
};