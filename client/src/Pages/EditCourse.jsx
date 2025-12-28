import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import toast, { Toaster } from "react-hot-toast";
import { Progress } from "@chakra-ui/react";
import { useCourses } from "@/context/CourseContext";
import { useNavigate, useParams } from "react-router-dom";

export default function EditCourse() {
  const { id } = useParams();
  const {courses, setCourses} = useCourses();
  const [selectCourse, setSelectCourse] = useState(null);

   
   
  const [imageLoader, setImageLoader] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    description: "",
    fees: ""
  });
  const navigate = useNavigate();
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
  useEffect(() => {
    const selectedCourse = courses.find((course) => course._id === id);
    setSelectCourse(selectedCourse);
  }, [id, courses]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await fetch(`/editCourse/${selectCourse?._id}`, {
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({ formData, image }),
      credentials: 'include'

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
    <div className="w-[80%] mx-auto mt-20 space-y-6 bg-gradient-to-br from-indigo-50 via-indigo-100 to-white rounded-2xl shadow-lg p-8">
      <h1 className="text-3xl font-extrabold text-indigo-800 text-center mb-6">Edit Course</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Course Name */}
        <div className="flex flex-col">
          <Label className="mb-2 text-gray-700 font-medium" htmlFor="name">Course Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={selectCourse?.name}
            className="bg-white border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Duration */}
        <div className="flex flex-col">
          <Label className="mb-2 text-gray-700 font-medium" htmlFor="duration">Duration</Label>
          <Input
            id="duration"
            name="duration"
            type="text"
            value={formData.duration}
            onChange={handleChange}
            placeholder={selectCourse?.duration}
            className="bg-white border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <Label className="mb-2 text-gray-700 font-medium" htmlFor="description">Course Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder={selectCourse?.description}
            className="bg-white border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Fees */}
        <div className="flex flex-col">
          <Label className="mb-2 text-gray-700 font-medium" htmlFor="fees">Course Fee</Label>
          <Input
            id="fees"
            name="fees"
            type="number"
            value={formData.fees}
            onChange={handleChange}
            placeholder={selectCourse?.fees}
            className="bg-white border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Profile Image */}
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
    </div>
  </>
);

}