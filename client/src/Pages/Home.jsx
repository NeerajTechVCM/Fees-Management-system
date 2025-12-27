import React from "react";
import { User, BookOpen, Users, IndianRupeeIcon, IndianRupee } from "lucide-react";
import { useCourses } from "@/context/CourseContext";
import { useStudents } from "@/context/StudentContext";
import { usePayments } from "@/context/PaymentContext";
import { Skeleton } from "@chakra-ui/react";

const HomePage = () => {
  const { courses, loading: coursesLoading } = useCourses();
  const { students, loading: studentsLoading } = useStudents();
  const { paymentHistory, loading: paymentsLoading } = usePayments();

  const isLoading = coursesLoading || studentsLoading || paymentsLoading;

  // Calculate total fees safely
  const totalAmountPaid = (paymentHistory || []).reduce(
    (acc, fee) => acc + Number(fee.amountPaid),
    0
  );

  // Get first 3 items for preview
  const firstThreeCourses = courses?.slice(0, 3) || [];
  const firstThreeStudents = students?.slice(0, 3) || [];

  // Totals
  const totalCourses = courses?.length || 0;
  const totalStudents = students?.length || 0;

  // Show loading skeletons if data is being fetched
  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen flex flex-col gap-6">
        <Skeleton height="60px" width="60%" />
        <Skeleton height="40px" width="40%" />
        <div className="flex flex-wrap gap-8">
          <Skeleton height="150px" width="250px" />
          <Skeleton height="150px" width="250px" />
          <Skeleton height="150px" width="250px" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-800">
          Welcome to the Fees Management System
        </h1>
        <p className="text-gray-600 mt-3 text-lg md:text-xl">
          Here's an overview of your courses and users.
        </p>
      </header>

      {/* Summary Cards */}
      <div className="flex flex-col md:flex-row flex-wrap items-center justify-center w-full gap-8 mb-12">
        {[
          {
            icon: <BookOpen size={40} className="text-indigo-500" />,
            title: "Courses Available",
            value: totalCourses,
          },
          {
            icon: <Users size={40} className="text-green-500" />,
            title: "Students Enrolled",
            value: totalStudents,
          },
          {
            icon: <IndianRupeeIcon size={40} className="text-red-500" />,
            title: "Total Fees Collection",
            value: (
              <div className="flex items-center justify-center gap-1">
                <IndianRupee /> {totalAmountPaid}
              </div>
            ),
          },
        ].map((card, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-br from-indigo-50 via-indigo-100 to-white w-64 md:w-72 p-6 rounded-2xl shadow-lg flex flex-col items-center text-center transform transition duration-500 hover:-translate-y-2 hover:shadow-2xl hover:scale-105"
          >
            {card.icon}
            <h2 className="text-2xl font-semibold text-indigo-800 mt-4">{card.title}</h2>
            <p className="text-xl font-bold text-gray-700 mt-2">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Courses Section */}
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-6 border-b-2 border-indigo-400 inline-block pb-1">
          Some Courses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {firstThreeCourses.length ? (
            firstThreeCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white p-6 rounded-2xl shadow-md transform transition duration-500 hover:-translate-y-2 hover:shadow-lg hover:scale-105 text-gray-800"
              >
                <h3 className="text-2xl font-semibold mb-2 text-indigo-700">{course.name}</h3>
                <p className="text-gray-700 mt-2">{course.description}</p>
                <p className="text-gray-500 mt-1 italic">Duration: {course.duration}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">No courses added yet.</p>
          )}
        </div>
      </div>

      {/* Students Section */}
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-6 border-b-2 border-green-400 inline-block pb-1">
          Some Students
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {firstThreeStudents.length ? (
            firstThreeStudents.map((student) => (
              <div
                key={student._id}
                className="bg-white p-6 rounded-2xl shadow-md transform transition duration-500 hover:-translate-y-2 hover:shadow-lg hover:scale-105 text-gray-800"
              >
                <h3 className="text-2xl font-semibold mb-2 text-green-600">{student.fullName}</h3>
                <p className="text-gray-700 mt-1">
                  Enrolled Courses: <span className="font-medium">{student.courseName || "None"}</span>
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">No students enrolled yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
