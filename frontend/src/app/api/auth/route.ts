import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Call your real API to get the token
    const res = await fetch("https://api/v1/livejamgames.com/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { success: false, message: data.message || "Login failed" },
        { status: res.status }
      );
    }

    // Store token in a secure HTTP-only cookie
    const response = NextResponse.json({
      success: true,
      message: "Logged in successfully",
    });
    response.cookies.set({
      name: "token",
      value: data.token, // assuming API returns { token: "..." }
      httpOnly: true, // prevents JS access
      secure: process.env.NODE_ENV === "production",
      path: "/", // cookie available site-wide
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "lax",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
