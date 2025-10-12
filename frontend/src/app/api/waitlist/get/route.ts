import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Replace this URL with your real API endpoint
    const response = await fetch(
      "https://api/v1/livejamgames.com/admin/get-waitlist",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Add authorization if needed
          // "Authorization": `Bearer ${process.env.ADMIN_API_TOKEN}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: data.message || "Failed to fetch waitlist" },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, waitlist: data });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
