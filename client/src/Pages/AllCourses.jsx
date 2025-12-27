import React, { useEffect, useState } from 'react';
import Course from '@/components/Course';
import { Link } from 'react-router-dom';

import { Loading } from '@/components/Loading';
import { useCourses } from '@/context/CourseContext';

export default function AllCourses() {
  const {courses, setCourses,loading} = useCourses();





  return (

    <>
   
      <div className="flex justify-center items-center w-full flex-wrap gap-5 mt-5 p-3">
      {
      loading?
      <Loading/>
      :  
      
  <>{courses.length === 0 ? (
  <p>No courses available</p>
) : (
  courses.map((course) => (
    
    
    <Link
   
      to={`/courseDetails/${course._id}`} 
    >
      <Course key={course._id}  course={course} />
     
    </Link>
  ))
)}
  </>
        


}
</div>
    </>

  );
}
