import { db } from "@/lib/db";
import { UserAddress, Course } from "@prisma/client";

interface GetUserProps {
  userId: string | undefined;
  courseId: string | undefined;
}

export const getUserAddressAndCourse = async ({
  userId,
  courseId,
}: GetUserProps): Promise<{
  userAddress: UserAddress | null;
  selectedCourse: Course | null;
}> => {
  try {
    const [userAddress, selectedCourse] = await Promise.all([
      db.userAddress.findUnique({
        where: { userId },
      }),
      db.course.findUnique({
        where: { id: courseId },
      }),
    ]);

    return { userAddress, selectedCourse };
  } catch (error) {
    console.error("[GET_USER_ADDRESS_AND_COURSE_ERROR]", error);
    return {
      userAddress: null,
      selectedCourse: null,
    };
  }
};
