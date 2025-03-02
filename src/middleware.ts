import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(request: NextRequest) {
  // Get token from cookies
  const token = request.cookies.get("accessToken")?.value;
  if (!token) {
    // Redirect to home if no token is present
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Decode token to get user info
  let userInfo: { role?: string };
  try {
    userInfo = jwtDecode(token as string) as { role?: string };
  } catch (error) {
    if (error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return;
  }

  const currentPath = request.nextUrl.pathname;
  // Restrict access to admin paths if user is not an ADMIN
  if (
    currentPath.startsWith("/dashboard") &&
    userInfo?.role !== "SUPER_ADMIN"
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/shop", "/groups"],
};
