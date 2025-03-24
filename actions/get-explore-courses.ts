"use server";

import { Category, Course } from "@prisma/client";
import { db } from "@/lib/db";

type CourseWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
};

type GetExploreCourses = {
  search?: string;
  categoryId?: string;
};

export const getExploreCourses = async ({
  search,
  categoryId
}: GetExploreCourses = {}): Promise<CourseWithCategory[]> => {
  try {
    // Build the query conditions
    const whereConditions: any = {
      isPublished: true,
    };

    // Add category filter if provided
    if (categoryId) {
      whereConditions.categoryId = categoryId;
    }

    // Add fuzzy search conditions if search query is provided
    if (search) {
      whereConditions.OR = [
        {
          title: {
            contains: search,
            mode: 'insensitive', // Case insensitive search
          },
        },
        {
          description: {
            contains: search,
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

    return courses;
  } catch (error) {
    console.log("[GET_EXPLORE_COURSES]", error);
    return [];
  }
} 