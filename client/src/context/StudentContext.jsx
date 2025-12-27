import React, { createContext, useContext, useEffect, useState } from 'react'

 const StudentContext=createContext();
 

export default function StudentProvider({children}) {
    
  const [students, setStudents] = useState([]);
 
   useEffect(() => {
     const fetchStudents = async () => {
       const result = await fetch("http://localhost:8080/getAllStudents", {
         method: "GET",
         headers: {
           "Content-Type": 'application/json',
         },
         credentials: 'include',
       });
 
       const data = await result.json();
       
       if (data.students) {
         setStudents(data.students);
       }
     };
 
     fetchStudents();
   }, []);
  return (
   <StudentContext.Provider value={[students,setStudents]}>
    {children}
   </StudentContext.Provider>
  )
}




export const useStudents=()=>useContext(StudentContext);