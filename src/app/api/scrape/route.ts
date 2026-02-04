import { NextResponse } from "next/server";
import { scrapeWebsite } from "@/lib/scraper";

export async function GET(req: Request) {

    try {
        const url = `https://outrank.so`
    if (!url) {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

    const result = await scrapeWebsite(url);

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
