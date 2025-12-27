import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useCourses } from "@/context/CourseContext";
import toast, { Toaster } from "react-hot-toast";
import { useStudents } from "@/context/StudentContext";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export default function EditStudent() {
  const [courses, setCourses] = useCourses();

  const { id } = useParams();

  const [students, setStudents] = useStudents();
  const [selectStudents, setSelectStudents] = useState(null);
const navigate= useNavigate();

  useEffect(() => {
    const selectedStudent = students.find((student) => student._id === id);
    setSelectStudents(selectedStudent);
  }, [id, students]);

  const [stuFormData, setStuFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    course: { id: "", name: "", fees: "" },
    session: ""
  });
  const [image, setImage] = useState(null)
  const handleChange = (e) => {
    setStuFormData({ ...stuFormData, [e.target.name]: e.target.value });
  };
  const handleFileChange = async (e) => {

    let img = e.target.files[0];
    try {
      const formData = new FormData()
    

      formData.append('file', img)
      formData.append('upload_preset', 'Fees management')
      formData.append('cloud_name', 'dbggewejk')

      const result = await fetch('https://api.cloudinary.com/v1_1/dbggewejk/image/upload', {
        method: "POST",


        body: (formData)

      });
      const data = await result.json();
      console.log(data.url)
      setImage(data.url)


    } catch (error) {

    }

  }
  const handleSubmit = async (e) => {
    e.preventDefault();


    const result = await fetch(`/editStudent/${selectStudents?._id}`, {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({ stuFormData, image }),
      credentials: 'include',
    });

    const data = await result.json();
 

    if (data.success) {
        
        setTimeout(() => {
            window.location.reload();
          }, 1000); 
         
            navigate(-1); 
      toast.success(data.message)
     
    } else {
      toast.error(data.message)
    }

    setStuFormData({
      fullName: "",
      email: "",
      phone: "",
      course: { id: "", name: "", fees: "" },
      session: "",
    });
  };

return (
  <>
    <Toaster />
    <form
      onSubmit={handleSubmit}
      className="w-[80%] mx-auto mt-20 p-8 space-y-6 bg-gradient-to-br from-indigo-50 via-indigo-100 to-white rounded-2xl shadow-lg"
    >
      <h1 className="text-3xl font-extrabold text-indigo-800 text-center mb-6">Edit Student</h1>

      {/* Full Name */}
      <div className="flex flex-col">
        <Label className="mb-2 text-gray-700 font-medium" htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          name="fullName"
          value={stuFormData.fullName}
          onChange={handleChange}
          placeholder={selectStudents?.fullName}
          className="bg-white border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* Email */}
      <div className="flex flex-col">
        <Label className="mb-2 text-gray-700 font-medium" htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={stuFormData.email}
          onChange={handleChange}
          placeholder={selectStudents?.email}
          className="bg-white border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* Phone */}
      <div className="flex flex-col">
        <Label className="mb-2 text-gray-700 font-medium" htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={stuFormData.phone}
          onChange={handleChange}
          placeholder={selectStudents?.phone}
          className="bg-white border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* Course (disabled) */}
      <div className="flex flex-col">
        <Label className="mb-2 text-gray-700 font-medium">Course</Label>
        <Select
          value={stuFormData.course.name}
          onValueChange={(value) => {
            const selectedCourse = courses.find(course => course.name === value);
            setStuFormData({ ...stuFormData, course: { id: selectedCourse._id, name: selectedCourse.name, fees: selectedCourse.fees } });
          }}
          disabled
        >
          <SelectTrigger className="bg-white mt-2 w-full">
            <SelectValue placeholder={selectStudents?.courseName} />
          </SelectTrigger>
          <SelectContent>
            {courses.map(course => (
              <SelectItem key={course.id} value={course.name}>{course.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Session (disabled) */}
      <div className="flex flex-col">
        <Label className="mb-2 text-gray-700 font-medium" htmlFor="session">Session</Label>
        <Input
          id="session"
          name="session"
          type="text"
          value={stuFormData.session}
          placeholder={selectStudents?.session}
          onChange={handleChange}
          disabled
          className="bg-white border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* Profile */}
      <div className="flex flex-col">
        <Label className="mb-2 text-gray-700 font-medium" htmlFor="profile">Profile</Label>
        <Input
          id="profile"
          type="file"
          onChange={handleFileChange}
          className="bg-white border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md hover:shadow-lg"
      >
        Submit
      </Button>
    </form>
  </>
);

}
