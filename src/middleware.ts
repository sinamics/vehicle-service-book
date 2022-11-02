import { NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest) {
  const { origin, pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") || // exclude Next.js internals
    pathname.startsWith("/api") || //  exclude all API routes
    pathname.startsWith("/static") || // exclude static files
    pathname.startsWith("/auth") || // exclude auth files
    pathname === "/" || // exclude home page
    PUBLIC_FILE.test(pathname) // exclude all files in the public folder
  ) {
    return NextResponse.next();
  }

  const callbackUrl = new URL(pathname, origin);
  const encoded = encodeURIComponent(callbackUrl.toString());

  return NextResponse.next();
  // return NextResponse.redirect(`${origin}/auth/login?callbackUrl=${encoded}`);
}
