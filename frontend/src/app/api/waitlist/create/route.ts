import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const response = await axios.post(
      "https://waitlist.jamescog.com/api/v1/user/waitlist",
      { email },
      {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (err: any) {
    return NextResponse.json(
      {
        details: err.response?.data || err.message,
      },
      { status: err.response?.status || 500 }
    );
  }
}
