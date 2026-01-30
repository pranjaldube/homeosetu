import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const bookId = searchParams.get("bookId");
    const bookName = searchParams.get("bookName");

    // Build where condition - can search by bookId or bookName
    const whereCondition: any = {};
    
    if (bookId) {
      whereCondition.id = bookId;
    } else if (bookName) {
      whereCondition.bookName = bookName;
    } else {
      return new NextResponse(
        JSON.stringify({ error: "Either bookId or bookName must be provided" }),
        { status: 400 }
      );
    }

    // Fetch the book with all its contents and related data
    const book = await db.book.findFirst({
      where: whereCondition,
      include: {
        chapters: {
          include: {
            rubrics: {
              include: {
                remedies: true,
                notes: true,
                crossReferences: true,
              },
            },
          },
        },
      },
    });

    if (!book) {
      return new NextResponse(
        JSON.stringify({ error: "Book not found" }),
        { status: 404 }
      );
    }

    // Map contents (chapters) with all related data
    const contents = book.chapters.map((content) => ({
      id: content.id,
      name: content.name,
      icon: content.icon,
      description: content.description || null,
      bookId: content.bookId,
      rubrics: content.rubrics.map((rubric) => ({
        id: rubric.id,
        name: rubric.name,
        meaning: rubric.meaning || null,
        chapterId: rubric.chapterId,
        remedies: rubric.remedies.map((remedy) => ({
          id: remedy.id,
          abbr: remedy.abbr,
          grade: remedy.grade,
          rubricId: remedy.rubricId,
          fullForm: remedy.fullForm,
          description: remedy.description,

        })),
        notes: rubric.notes.map((note) => ({
          id: note.id,
          type: note.type,
          source: note.source || null,
          text: note.text,
          rubricId: note.rubricId,
        })),
        crossReferences: rubric.crossReferences.map((crossRef) => ({
          id: crossRef.id,
          chapterTarget: crossRef.chapterTarget,
          rubricTarget: crossRef.rubricTarget,
          rubricId: crossRef.rubricId,
        })),
      })),
    }));

    return NextResponse.json({
      book: {
        id: book.id,
        bookName: book.bookName,
        createdAt: book.createdAt,
      },
      contents: contents,
    });
  } catch (error) {
    console.error("[BOOK_CONTENTS_GET]", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
