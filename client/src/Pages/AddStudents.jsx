import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useCourses } from "@/context/CourseContext";
import toast, { Toaster } from "react-hot-toast";

export default function AddStudent() {
  const {courses, setCourses} = useCourses();


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
 

    const result = await fetch('/addStudent', {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({ stuFormData, image }),
      credentials: 'include',
    });

    const data = await result.json();
  

    if (data.success) {
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
      className="w-[90%] max-w-3xl mx-auto mt-16 p-8 bg-gradient-to-br from-indigo-50 via-indigo-100 to-white rounded-2xl shadow-lg space-y-6"
    >
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-800 text-center">
        Add New Student
      </h1>

      {/* Full Name */}
      <div className="flex flex-col">
        <Label htmlFor="fullName" className="mb-2 text-gray-700 font-medium">Full Name</Label>
        <Input
          id="fullName"
          name="fullName"
          value={stuFormData.fullName}
          onChange={handleChange}
          className="bg-white border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Enter full name"
        />
      </div>

      {/* Email */}
      <div className="flex flex-col">
        <Label htmlFor="email" className="mb-2 text-gray-700 font-medium">Email</Label>
        <Input
          type="email"
          id="email"
          name="email"
          value={stuFormData.email}
          onChange={handleChange}
          className="bg-white border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Enter email"
        />
      </div>

      {/* Phone */}
      <div className="flex flex-col">
        <Label htmlFor="phone" className="mb-2 text-gray-700 font-medium">Phone Number</Label>
        <Input
          type="tel"
          id="phone"
          name="phone"
          value={stuFormData.phone}
          onChange={handleChange}
          className="bg-white border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Enter phone number"
        />
      </div>

      {/* Course Select */}
      <div className="flex flex-col">
        <Label className="mb-2 text-gray-700 font-medium">Course</Label>
        <Select
          value={stuFormData.course.name}
          onValueChange={(value) => {
            const selectedCourse = courses.find(course => course.name === value);
            setStuFormData({ ...stuFormData, course: { id: selectedCourse._id, name: selectedCourse.name, fees: selectedCourse.fees } });
          }}
        >
          <SelectTrigger className="bg-white mt-2 w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400">
            <SelectValue placeholder="Select Course" />
          </SelectTrigger>
          <SelectContent>
            {courses.map((course) => (
              <SelectItem key={course.id} value={course.name}>
                {course.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Session */}
      <div className="flex flex-col">
        <Label htmlFor="session" className="mb-2 text-gray-700 font-medium">Session</Label>
        <Input
          type="text"
          id="session"
          name="session"
          value={stuFormData.session}
          onChange={handleChange}
          className="bg-white border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Enter session (e.g., 2025-2026)"
        />
      </div>

      {/* Profile Image */}
      <div className="flex flex-col">
        <Label htmlFor="profile" className="mb-2 text-gray-700 font-medium">Profile Image</Label>
        <Input
          type="file"
          id="profile"
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
