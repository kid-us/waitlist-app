import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/admin"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const response = NextResponse.next();

  // Only protect certain routes
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    // Read token from cookie
    const token = localStorage.getItem("token");

    if (!token) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    try {
      const res = await fetch(`/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }

      const user = await res.json();
      response.headers.set("x-user", JSON.stringify(user));
    } catch (err) {
      console.error("Error fetching user:", err);
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  return response;
}
