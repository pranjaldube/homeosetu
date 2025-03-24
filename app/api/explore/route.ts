import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = 'force-dynamic';

export async function GET(
  req: Request,
) {
  try {
    const { searchParams } = new URL(req.url);
    const searchQuery = searchParams.get("search") || "";
    const categoryId = searchParams.get("categoryId") || undefined;

    // Build the query conditions
    const whereConditions: any = {
      isPublished: true,
    };

    // Add category filter if provided
    if (categoryId) {
      whereConditions.categoryId = categoryId;
    }

    // Add fuzzy search conditions if search query is provided
    if (searchQuery) {
      whereConditions.OR = [
        {
          title: {
            contains: searchQuery,
            mode: 'insensitive', // Case insensitive search
          },
        },
        {
          description: {
            contains: searchQuery,
            mode: 'insensitive', // Case insensitive search
          },
        },
      ];
    }

    const courses = await db.course.findMany({
      where: whereConditions,
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          }
        },
      },
      orderBy: {
        createdAt: "desc",
      }
    });

    return NextResponse.json(courses);
  } catch (error) {
    console.log("[EXPLORE_COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 