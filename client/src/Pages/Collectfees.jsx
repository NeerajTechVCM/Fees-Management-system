import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useStudents } from "@/context/StudentContext";
import { useCourses } from "@/context/CourseContext";
import toast, { Toaster } from "react-hot-toast";

export default function CollectFees() {
  const [students, setStudents] = useStudents();
  const [courses, setCourses] = useCourses();
  const [formData, setFormData] = useState({

    stuId: "",
    course: "",

    totalFees: "",
    amountPaid: "",
    paymentMethod: "",
    remarks: "",
  });









  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "course") {
      const selectedCourse = courses.find((course) => course.name === value);
      if (selectedCourse) {
        setFormData((prev) => ({
          ...prev,
          totalFees: selectedCourse.fees,
        }));
      }
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "course") {
      const selectedCourse = courses.find((course) => course.name === value);
      if (selectedCourse) {
        setFormData((prev) => ({
          ...prev,
          totalFees: selectedCourse.fees,
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const result = await fetch("/collectFees", {
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(formData),
      credentials: 'include'

    });
    const data = await result.json();
  

    if (data.success) {
      toast.success(data.message)

    } else {
      toast.error(data.message)


    }
    setFormData(
      {

        stuId: "",
        course: "",
        session: "",
        totalFees: "",
        amountPaid: "",
        paymentMethod: "",
        remarks: "",
      }
    )

  };

return (
  <>
    <Toaster />
    <div className="w-full flex justify-center items-center mt-20">
      <Card className="w-[90%] max-w-4xl mx-auto p-8 bg-gradient-to-br from-indigo-50 via-indigo-100 to-white rounded-2xl shadow-lg">
        <CardContent>
          <h2 className="text-2xl md:text-3xl text-indigo-800 font-extrabold text-center mb-6">
            Fees Collection Form
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Student Id */}
              <div className="flex flex-col">
                <Label className="mb-2 text-gray-700 font-medium">Student Id</Label>
                <Select
                  name="stuId"
                  value={formData.stuId}
                  onValueChange={(value) => handleSelectChange("stuId", value)}
                >
                  <SelectTrigger className="bg-white mt-2 w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400">
                    <SelectValue placeholder="Select Student Id" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((student) => (
                      <SelectItem key={student._id} value={student.stuId}>
                        {student.stuId}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Course */}
              <div className="flex flex-col">
                <Label className="mb-2 text-gray-700 font-medium">Course</Label>
                <Select
                  name="course"
                  value={formData.course}
                  onValueChange={(value) => handleSelectChange("course", value)}
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

              {/* Total Fee */}
              <div className="flex flex-col">
                <Label className="mb-2 text-gray-700 font-medium">Total Fee</Label>
                <Input
                  name="totalFees"
                  type="text"
                  value={formData.totalFees}
                  readOnly
                  className="bg-white border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 mt-2"
                />
              </div>

              {/* Amount Paid */}
              <div className="flex flex-col">
                <Label className="mb-2 text-gray-700 font-medium">Amount Paid</Label>
                <Input
                  name="amountPaid"
                  type="text"
                  placeholder="Enter amount paid"
                  value={formData.amountPaid}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 mt-2"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="flex flex-col">
              <Label className="mb-2 text-gray-700 font-medium">Payment Method</Label>
              <Select
                name="paymentMethod"
                value={formData.paymentMethod}
                onValueChange={(value) => handleSelectChange("paymentMethod", value)}
              >
                <SelectTrigger className="bg-white mt-2 w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400">
                  <SelectValue placeholder="Select Payment Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="card">Card</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Remarks */}
            <div className="flex flex-col">
              <Label className="mb-2 text-gray-700 font-medium">Remarks</Label>
              <Textarea
                name="remarks"
                placeholder="Enter remarks (optional)"
                value={formData.remarks}
                onChange={handleChange}
                className="bg-white border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 mt-2"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md hover:shadow-lg"
            >
              Submit Payment
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  </>
);

}
