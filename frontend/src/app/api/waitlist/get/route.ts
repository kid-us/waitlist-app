import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

// Simple in-memory cache
const cache: Record<string, { data: any; expiry: number }> = {};
const CACHE_TTL = 60 * 1000; // 1 minute

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("access_token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const url = new URL(req.url);
    const page = url.searchParams.get("page") || "1";
    const per_page = url.searchParams.get("per_page") || "10";

    const cacheKey = `waitlist-${page}-${per_page}`;

    // Return cached data if valid
    const cached = cache[cacheKey];
    if (cached && cached.expiry > Date.now()) {
      return NextResponse.json(cached.data);
    }

    const apiUrl = "https://waitlist.jamescog.com/api/v1/admin/waitlist";
    const response = await axios.get(apiUrl, {
      params: { page, per_page },
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    // Save to cache
    cache[cacheKey] = {
      data: response.data,
      expiry: Date.now() + CACHE_TTL,
    };

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.response?.data?.message || error.message,
      },
      { status: error.response?.status || 500 }
    );
  }
}
