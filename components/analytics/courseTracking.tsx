"use client";
import posthog from "posthog-js";

export const trackViewStudyCourses = (category?: string, total?: number) => {
  posthog.capture("view_study_courses", { category, total_courses: total });
};

export const trackClickCourseCard = (courseId: string, courseName: string) => {
  posthog.capture("click_course_card", { course_id: courseId, course_name: courseName });
};

export const trackViewCourseDetails = (courseId: string, source?: string) => {
  posthog.capture("view_course_details", { course_id: courseId, source });
};

export const trackClickEnrollButton = (courseId: string, plan?: string) => {
  posthog.capture("click_enroll_button", { course_id: courseId, plan });
};

export const trackCourseEnrolled = (courseId: string, paymentStatus: string) => {
  posthog.capture("course_enrolled", { course_id: courseId, payment_status: paymentStatus });
};
