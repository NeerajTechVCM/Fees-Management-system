import React from 'react'

  
export default function Course({course}) {
return (
  <div className="w-72 bg-gradient-to-br from-purple-100 via-purple-200 to-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
    {/* Course Image */}
    <div className="overflow-hidden">
      <img src={course.courseImg} alt={course.name} className="w-full h-40 object-cover rounded-t-2xl" />
    </div>

    {/* Course Info */}
    <div className="p-4 flex flex-col items-center text-center space-y-2">
      <h2 className="text-xl font-semibold text-purple-800">{course.name}</h2>
      <p className="text-gray-600 text-sm">{course.description}</p>
    </div>
  </div>
);

}
