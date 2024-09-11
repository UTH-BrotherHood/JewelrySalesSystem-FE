import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const authPaths = ["sign-in"];
const privatePaths = ["dashboard"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;


  const isTokenExpired = (token: string) => {
    try {
      const decodedToken = jwt.decode(token) as { exp?: number };
      if (decodedToken?.exp) {
        const currentTime = Math.floor(Date.now() / 1000);
        return decodedToken.exp < currentTime;
      }
      return true;
    } catch (error) {
      return true;
    }
  };

  const isRoleEmployee = (token: string) => {
    try {
      const decodedToken = jwt.decode(token) as { scope?: string };
      return decodedToken?.scope === "ROLE_EMPLOYEE";
    } catch (error) {
      return false;
    }
  };

  const isRoleAdmin = (token: string) => {
    try {
      const decodedToken = jwt.decode(token) as { scope?: string };
      return decodedToken?.scope === "ROLE_ADMIN";
    } catch (error) {
      return false;
    }
  };

  // Redirect if accessing private paths without valid admin token
  if (privatePaths.some((path) => pathname.includes(path))) {
    if (!token || isTokenExpired(token) || isRoleEmployee(token)) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }
  if (
    authPaths.some((path) => pathname.includes(path)) &&
    token &&
    !isTokenExpired(token)
  ) {
    if (isRoleAdmin(token)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else if (isRoleEmployee(token)) {
      return NextResponse.redirect(new URL("/", request.url)); 
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/sign-in", "/dashboard"],
};
