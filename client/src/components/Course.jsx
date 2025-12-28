import React from 'react'
import { Card } from './ui/card';
  
export default function Course({course}) {
return (
   <Card className="w-72 bg-gradient-to-br from-indigo-50 via-indigo-100 to-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
    <div className="flex flex-col items-center ">
    
      <div className="relative">
        <img
          src={course.courseImg}
          alt={course.name}
          className="w-full h-40 rounded-t-2xl object-cover border-4 border-indigo-500 shadow-md"
        />
      </div>

   
      <h3 className="text-xl font-semibold text-indigo-800 mt-4 text-center">{course.name}</h3>
      <p className="text-sm text-gray-600">{course.description}</p>
  
    </div>
  </Card>
);

}
