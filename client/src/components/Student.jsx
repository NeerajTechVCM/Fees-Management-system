import React from 'react';
import { Card } from './ui/card';


const Student = ({student}) => {
return (
  <Card className="w-72 bg-gradient-to-br from-indigo-50 via-indigo-100 to-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
    <div className="flex flex-col items-center p-4">
      {/* Profile Image */}
      <div className="relative">
        <img
          src={student.stuImg}
          alt={student.fullName}
          className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500 shadow-md"
        />
      </div>

      {/* Student Info */}
      <h3 className="text-xl font-semibold text-indigo-800 mt-4 text-center">{student.fullName}</h3>
      <p className="text-sm text-gray-600">{student.stuId}</p>
      <p className="text-sm text-gray-600">{student.courseName}</p>
    </div>
  </Card>
);

};

export default Student;
