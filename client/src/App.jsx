import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation,  useNavigate } from 'react-router-dom';
import Home from './Pages/Home';

import Login from './Pages/Login';
import Layout from './layout';
import Signup from './Pages/Signup';
import Cookies from 'js-cookie';
import AllCourses from './Pages/AllCourses';
import AddCourses from './Pages/AddCourses';
import AllStudents from './Pages/AllStudents';
import AddStudents from './Pages/AddStudents';
import Collectfees from './Pages/Collectfees';
import PaymentHistory from './Pages/PaymentHistory';
import CourseDetails from './Pages/CourseDetails';
import StudentDetails from './Pages/StudentDetails';
import EditCourse from './Pages/EditCourse';
import EditStudent from './Pages/Editstudent';


export default function App() {
const token = Cookies.get('token');
const navigate = useNavigate();
const location = useLocation(); 
useEffect(()=>{
if (!token && location.pathname !== '/login' && location.pathname !== '/signup') {
      navigate('/login');
    }


},[navigate,location,token])



  return (
   
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
       

        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/allCourses" element={<AllCourses/>} />
          <Route path="/addCourses" element={<AddCourses/>} />
          <Route path="/allStudents" element={<AllStudents/>} />
          <Route path="/addStudents" element={<AddStudents/>} />
          <Route path="/collectFees" element={<Collectfees/>} />
          <Route path="/paymentHistory" element={<PaymentHistory/>} />
          <Route path="/courseDetails/:id" element={<CourseDetails/>} />
          <Route path="/studentDetails/:id" element={<StudentDetails/>} />
          <Route path="/editCourse/:id" element={<EditCourse/>} />
          <Route path="/editStudent/:id" element={<EditStudent/>} />
        </Route>
      </Routes>

  );
}
