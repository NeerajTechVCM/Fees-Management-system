import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import toast, { Toaster } from "react-hot-toast";
import { Progress } from "@chakra-ui/react";

export default function AddCourseForm() {
  const [imageLoader, setImageLoader] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    description: "",
    fees: ""
  });
  const [image, setImage] = useState(null)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileChange = async (e) => {
setImageLoader(true)
    let img = e.target.files[0];

    try {
      const formData = new FormData()
    

      formData.append('file', img)
      formData.append('upload_preset', 'Fees management')
      formData.append('cloud_name', 'dbggewejk')
   
      const result = await fetch('https://api.cloudinary.com/v1_1/dbggewejk/image/upload', {
        method: "POST",
        // mode: 'no-cors',

        body: (formData)
        // credentials: 'include',
      });
      const data = await result.json();
      if(data){
       
        console.log(data.url)
        setImage(data.url)
        setImageLoader(false)
       
      }
     


    } catch (error) {

    }

  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await fetch("http://localhost:8080/addCourse", {
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({ formData, image }),
      credentials: 'include'

    });
    const data = await result.json();
  

    if (data.success) {

      toast.success(data.message)

    } else {

      toast.error(data.message)

    }
    setFormData({

      name: "",
      duration: "",
      description: "",
      fees: ""
    })

  };

return (
  <>
    <Toaster />
    <div className="w-[90%] max-w-3xl mx-auto mt-20 p-8 bg-gradient-to-br from-indigo-50 via-indigo-100 to-white rounded-2xl shadow-lg space-y-6">
      
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-800 text-center">
        Add New Course
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Course Name */}
        <div className="flex flex-col">
          <Label htmlFor="name" className="mb-2 text-gray-700 font-medium">Course Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="bg-white border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter course name"
          />
        </div>

        {/* Duration */}
        <div className="flex flex-col">
          <Label htmlFor="duration" className="mb-2 text-gray-700 font-medium">Duration</Label>
          <Input
            type="text"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="bg-white border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="e.g., 3 months"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <Label htmlFor="description" className="mb-2 text-gray-700 font-medium">Course Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="bg-white border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Brief description of the course"
          />
        </div>

        {/* Fees */}
        <div className="flex flex-col">
          <Label htmlFor="fees" className="mb-2 text-gray-700 font-medium">Course Fee</Label>
          <Input
            type="number"
            id="fees"
            name="fees"
            value={formData.fees}
            onChange={handleChange}
            className="bg-white border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter fee amount"
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
    </div>
  </>
);

}