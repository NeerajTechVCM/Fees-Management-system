import React, { createContext, useContext, useEffect, useState } from 'react'

 const CourseContext=createContext();
 

export default function CourseProvider({children}) {
      const [loading,setLoading]= useState(true)
    const [courses,setCourses]=useState([]);
    useEffect(() => {
      const fetchCourses = async () => {
        const result = await fetch("http://localhost:8080/getAllCourses", {
          method: "GET",
          headers: {
            "Content-Type": 'application/json',
          },
          credentials: 'include',
        });
    
        const data = await result.json();
        
        if (data.courses) {
          setCourses(data.courses);
          setLoading(false)
        }
      };
    
      fetchCourses();
    }, []);
  return (
   <CourseContext.Provider value={[courses,setCourses,loading]}>
    {children}
   </CourseContext.Provider>
  )
}




export const useCourses=()=>useContext(CourseContext);