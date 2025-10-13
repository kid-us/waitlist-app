import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const res = await axios.post(
      "https://waitlist.jamescog.com/api/v1/admin/login",
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );

    const data = res.data;

    const response = NextResponse.json({
      success: true,
      message: "Logged in successfully",
    });

    response.cookies.set({
      name: "access_token",
      value: data.access_token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });

    return response;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    const status = error.response?.status || 500;

    return NextResponse.json({ success: false, message }, { status });
  }
}
