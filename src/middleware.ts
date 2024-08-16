import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authPaths = ["sign-in"];
const privatePaths = ["dashboard"];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // chưa đăng nhập thì chuyển hướng về trang đăng nhập
  if (privatePaths.some((path) => pathname.includes(path)) && !token) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // đã đăng nhập thì chuyển hướng về trang dashboard
  if (authPaths.some((path) => pathname.includes(path)) && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/sign-in", "/dashboard"],
};
