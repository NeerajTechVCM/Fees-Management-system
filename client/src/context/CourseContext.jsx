import React, { createContext, useContext, useEffect, useState } from "react";

const CourseContext = createContext();

export default function CourseProvider({ children }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const result = await fetch("/getAllCourses", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await result.json();
      if (data.courses) setCourses(data.courses);
    } catch (err) {
      console.error("Error fetching courses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <CourseContext.Provider value={{ courses, setCourses, loading, fetchCourses }}>
      {children}
    </CourseContext.Provider>
  );
}




export const useCourses=()=>useContext(CourseContext);