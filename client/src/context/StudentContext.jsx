import React, { createContext, useContext, useEffect, useState } from "react";

const StudentContext = createContext();

export default function StudentProvider({ children }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const result = await fetch("/getAllStudents", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await result.json();
      if (data.students) setStudents(data.students);
    } catch (err) {
      console.error("Error fetching students:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <StudentContext.Provider value={{ students, setStudents, loading, fetchStudents }}>
      {children}
    </StudentContext.Provider>
  );
}

export const useStudents = () => useContext(StudentContext);
