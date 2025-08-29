import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server"; // Clerk auth
import { db } from "@/lib/db"; // your Prisma client

// GET: Get all cart items for logged-in use

export async function GET(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cartItems = await db.cart.findMany({
      where: { userId },
      include: {
        course: true, // joins Course table
      },
    });

    // Map to return just course details
    const courses = cartItems.map((item:any) => item.course);

    return NextResponse.json({ success: true, courses });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST: Add course to cart
// POST: Add course to cart
export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { courseId } = await req.json();

  if (!courseId) {
    return NextResponse.json({ error: "CourseId is required" }, { status: 400 });
  }

  // ✅ Check if course exists in DB
  const course = await db.course.findUnique({
    where: { id: courseId },
  });

  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  // ✅ Prevent duplicate in cart
  const existing = await db.cart.findFirst({
    where: { userId, courseId },
  });

  if (existing) {
    return NextResponse.json({ message: "Already in cart" }, { status: 200 });
  }

  // ✅ Add to cart
  const cartItem = await db.cart.create({
    data: { userId, courseId },
    include: { course: true },
  });

  return NextResponse.json(cartItem, { status: 201 });
}


// DELETE: Remove course from cart
export async function DELETE(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { courseId } = body;

  if (!courseId) {
    return NextResponse.json({ error: "CourseId is required" }, { status: 400 });
  }

  await db.cart.deleteMany({
    where: { userId, courseId },
  });

  return NextResponse.json({ message: "Course removed from cart" }, { status: 200 });
}
