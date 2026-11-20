import { NextRequest, NextResponse } from "next/server";
import { redirectToLogin } from "./utils/redirect-to-login";
import { EnumTokens } from "@/constants/auth.constants";

export async function protectUser(request: NextRequest) {
  const accessToken = request.cookies.get(EnumTokens.ACCESS_TOKEN)?.value;
  if (!accessToken) return redirectToLogin(request);

  return NextResponse.next();
}