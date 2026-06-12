import { NextResponse, type NextRequest } from "next/server";
import { getManagerSessionFromRequest } from "@/lib/manager/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await getManagerSessionFromRequest(request);

  if (pathname.startsWith("/dashboard")) {
    const destination = pathname.replace(/^\/dashboard/, "/manager-dashboard");
    return NextResponse.redirect(new URL(destination, request.url));
  }

  if (pathname.startsWith("/manager-dashboard") && !session) {
    const loginUrl = new URL("/manager-login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === "/manager-login" && session) {
    return NextResponse.redirect(new URL("/manager-dashboard", request.url));
  }

  if (pathname === "/manager/login") {
    const loginUrl = new URL("/manager-login", request.url);
    const next = request.nextUrl.searchParams.get("next");
    if (next) loginUrl.searchParams.set("next", next);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/manager-dashboard/:path*",
    "/manager-login",
    "/manager/login",
    "/dashboard/:path*",
  ],
};
