import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    // Fetch all books (just metadata, no contents)
    const books = await db.book.findMany({
      select: {
        id: true,
        bookName: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(books);
  } catch (error) {
    console.error("[BOOKS_GET]", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
