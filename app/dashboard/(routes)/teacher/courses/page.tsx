import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { BackButton } from "@/app/dashboard/_components/back-button";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

const CoursesPage = async () => {
  const user = await currentUser();
  const userId = user?.id;

  if (!userId) {
    return redirect("/");
  }

  const courses = await db.course.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return ( 
    <div>
      <BackButton href="/dashboard" label="Back to dashboard" />
      
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Your Courses</h1>
      </div>
      
      <DataTable columns={columns} data={courses} />
    </div>
   );
}
 
export default CoursesPage;