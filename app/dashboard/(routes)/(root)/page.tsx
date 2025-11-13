import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CheckCircle, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";

import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";

import { InfoCard } from "./_components/info-card";
import LoyaltyPointsField from "@/components/loyaltypointsField";

export default async function Dashboard() {
  const user = await currentUser();
  if (!user) {
    return redirect("/");
  }

  const { completedCourses, coursesInProgress } = await getDashboardCourses(
    user.id
  );

  return (
    <div className="p-6 space-y-4">
      <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100">
        <p className="text-2xl font-semibold mb-6 text-gray-800">
          User Details
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-600">
              Name
            </label>
            <Input
              id="name"
              name="name"
              value={user?.firstName || "User"}
              disabled
              className="bg-gray-50 text-gray-800 border-gray-200 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <Input
              id="email"
              name="email"
              value={
                user.emailAddresses?.[0]?.emailAddress || "user@example.com"
              }
              disabled
              className="bg-gray-50 text-gray-800 border-gray-200 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Loyalty Points */}
          <LoyaltyPointsField />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={Clock}
          label="In Progress"
          numberOfItems={coursesInProgress.length}
        />
        <InfoCard
          icon={CheckCircle}
          label="Completed"
          numberOfItems={completedCourses.length}
          variant="success"
        />
      </div>
      <CoursesList items={[...coursesInProgress, ...completedCourses]} />
    </div>
  );
}
