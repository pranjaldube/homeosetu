import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const bookId = searchParams.get("bookId");
    const bookName = searchParams.get("bookName");
    const chapterId = searchParams.get("chapterId");

    // Case 1: Fetch specific chapter contents (with rubrics)
    if (chapterId) {
      const contentItem = await db.content.findUnique({
        where: { id: chapterId },
        include: {
          rubrics: {
            include: {
              remedies: true,
              notes: true,
              crossReferences: true,
            },
          },
        },
      });

      if (!contentItem) {
        return new NextResponse(
          JSON.stringify({ error: "Chapter not found" }),
          {
            status: 404,
          },
        );
      }

      // Map single chapter content
      const content = {
        id: contentItem.id,
        name: contentItem.name,
        icon: contentItem.icon,
        description: contentItem.description || null,
        bookId: contentItem.bookId,
        rubrics: contentItem.rubrics.map((rubric) => ({
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
      };

      return NextResponse.json({ chapter: content });
    }

    // Case 2: Fetch book with chapters list (NO rubrics)
    // Build where condition - can search by bookId or bookName
    const whereCondition: any = {};

    if (bookId) {
      whereCondition.id = bookId;
    } else if (bookName) {
      whereCondition.bookName = bookName;
    } else {
      return new NextResponse(
        JSON.stringify({ error: "Either bookId or bookName must be provided" }),
        { status: 400 },
      );
    }

    // Fetch the book with chapters (but NOT rubrics)
    const book = await db.book.findFirst({
      where: whereCondition,
      include: {
        chapters: {
          orderBy: {
            name: "asc",
          },
        },
      },
    });

    if (!book) {
      return new NextResponse(JSON.stringify({ error: "Book not found" }), {
        status: 404,
      });
    }

    // Map contents (chapters) WITHOUT rubrics
    const contents = book.chapters.map((content) => ({
      id: content.id,
      name: content.name,
      icon: content.icon,
      description: content.description || null,
      bookId: content.bookId,
      rubrics: [], // Empty array as we fetch on demand
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
      { status: 500 },
    );
  }
}
