import { NextRequest, NextResponse } from "next/server";
import { nextRedirect } from "./utils/next-redirect";
import { USER_PAGE } from "@/config/user-page.config";
import { EnumTokens } from "@/constants/auth.constants";


export async function protectLoginPages(request: NextRequest) {
  const accessToken = request.cookies.get(EnumTokens.ACCESS_TOKEN)?.value;
  if (accessToken) return nextRedirect(USER_PAGE.HOME, request.url);
  return NextResponse.next();
}