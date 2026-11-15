import type { NextRequest } from "next/server";
import { PUBLIC_PAGE } from "@/config/public-page.config";
import { nextRedirect } from "./next-redirect";

export const redirectToLogin = (request: NextRequest) => {
  return nextRedirect(PUBLIC_PAGE.AUTH, request.url);
}