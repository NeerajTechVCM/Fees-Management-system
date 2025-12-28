import Student from '@/components/Student'
import { useStudents } from '@/context/StudentContext';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function AllStudents() {

 const {students, setStudents} = useStudents();





  return (
    <div className="flex justify-center items-center w-full flex-wrap gap-5 mt-5 p-3">
       {students.length === 0 ? (
              <p>No Students available</p>
            ) : (
              students.map((student) => (
                
                
                <Link
               
                  to={`/studentDetails/${student._id}`} 
                >
                  <Student key={student._id}  student={student} />
                 
                </Link>
              ))
            )}
      
            
      
    </div>
  )
}