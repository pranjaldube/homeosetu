import Mux from "@mux/mux-node";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

const { Video } = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!,
);

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          }
        },
        attachments: true,
        purchases: true,
      }
    });

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    // Delete Mux assets
    for (const chapter of course.chapters) {
      if (chapter.muxData?.assetId) {
        try {
          await Video.Assets.del(chapter.muxData.assetId);
        } catch (error) {
          console.log("[MUX_ASSET_DELETE_ERROR]", error);
          // Continue with deletion even if Mux deletion fails
        }
      }
    }

    // Delete the course with cascading deletes for related records
    const deletedCourse = await db.course.delete({
      where: {
        id: params.courseId,
      },
      include: {
        chapters: true,
        attachments: true,
      }
    });

    return NextResponse.json(deletedCourse);
  } catch (error) {
    console.log("[COURSE_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = await auth();
    const { courseId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.update({
      where: {
        id: courseId,
        userId
      },
      data: {
        ...values,
      }
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}