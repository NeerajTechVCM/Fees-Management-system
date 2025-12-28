import { Button } from '@/components/ui/button';
import { useCourses } from '@/context/CourseContext';
import { useStudents } from '@/context/StudentContext';
import { Input, Textarea } from '@chakra-ui/react';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Edit, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function CourseDetails() {
  const { id } = useParams();
  const {courses, setCourses} = useCourses();
  const [selectCourse, setSelectCourse] = useState(null);
  const {students, setStudents} = useStudents();
  const [selectStudents, setSelectStudents] = useState([]);

  useEffect(() => {
    const selectedCourse = courses.find((course) => course._id === id);
    setSelectCourse(selectedCourse);
  }, [id, courses]);


  useEffect(() => {
    const selectStudents = Array.isArray(students)
    ? students.filter((student) => student.courseId === id)
    : [];
  
  setSelectStudents(selectStudents);
  }, [id, students]);



return (
  <>
    {/* Course Card */}
    <div className="w-full mx-auto bg-gradient-to-r from-indigo-50 via-indigo-100 to-white shadow-lg rounded-lg overflow-hidden">
      {/* Course Image */}
      <div className="flex items-center p-6">
        <div className="w-80">
          <img
            src={selectCourse?.courseImg}
            className="rounded-md w-full object-cover"
            alt="Course Profile"
          />
        </div>
      </div>

      {/* Course Info */}
      <div className="px-6 py-4">
        <h2 className="text-3xl font-bold text-indigo-800">{selectCourse?.name}</h2>
        <p className="text-gray-600 mt-2">
          <span className="font-semibold">Description:</span> {selectCourse?.description}
        </p>
        <p className="text-gray-600 mt-1">
          <span className="font-semibold">Duration:</span> {selectCourse?.duration}
        </p>
        <p className="text-gray-600 mt-1">
          <span className="font-semibold">Price:</span> ₹{selectCourse?.fees}
        </p>
      </div>

      {/* Edit Button */}
      <div className="flex justify-end items-center px-6 py-3 bg-indigo-50">
        <Link
          to={`/editCourse/${selectCourse?._id}`}
          className="flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-800 transition duration-300"
        >
          <Edit size={20} />
          Edit
        </Link>
      </div>
    </div>

    {/* Students List */}
    <div className="mt-8 px-6">
      {selectStudents.length === 0 ? (
        <p className="text-gray-500">No students available</p>
      ) : (
        selectStudents.map((student) => (
          <div
            key={student._id}
            className="flex items-center mt-7 mb-4 border-b border-gray-200 pb-4"
          >
            <img
              src={student.stuImg}
              alt={student.fullName}
              className="w-16 h-16 rounded-full border-2 border-indigo-400 mr-4 object-cover"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">{student.fullName}</h3>
              <p className="text-sm text-gray-600">ID: {student.stuId}</p>
              <p className="text-sm text-gray-600">Email: {student.email}</p>
              <p className="text-sm text-gray-600">Phone: {student.phone}</p>
            </div>
          </div>
        ))
      )}
    </div>
  </>
);



}