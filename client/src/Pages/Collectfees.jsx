import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useStudents } from "@/context/StudentContext";
import { useCourses } from "@/context/CourseContext";
import { usePayments } from "@/context/PaymentContext";
import toast, { Toaster } from "react-hot-toast";

export default function CollectFees() {
  const { students } = useStudents();
  const { courses } = useCourses();
  const { payments } = usePayments();

  const [remainingFees, setRemainingFees] = useState(0);

  const [formData, setFormData] = useState({
    stuId: "",
    course: "",
    totalFees: "",
    amountPaid: "",
    paymentMethod: "",
    remarks: "",
  });

  // 🔹 total paid by student from payments context
  const getTotalPaidByStudent = (stuId) => {
    return payments
      .filter((p) => p.stuId === stuId)
      .reduce((sum, p) => sum + Number(p.amountPaid || 0), 0);
  };

  const handleSelectChange = (name, value) => {
    // ---------- STUDENT ID SELECT ----------
    if (name === "stuId") {
      const selectedStudent = students.find(
        (student) => student.stuId === value
      );
      if (!selectedStudent) return;

      const studentCourse = selectedStudent.course;
      const alreadyPaid = getTotalPaidByStudent(value);

      const selectedCourse = courses.find(
        (course) => course.name === studentCourse
      );

      if (selectedCourse) {
        const total = Number(selectedCourse.fees);
        const remaining = total - alreadyPaid;

        setFormData((prev) => ({
          ...prev,
          stuId: value,
          course: studentCourse,
          totalFees: total,
          amountPaid: "",
        }));

        setRemainingFees(remaining > 0 ? remaining : 0);
      }
    }

    // ---------- PAYMENT METHOD ----------
    if (name === "paymentMethod") {
      setFormData((prev) => ({
        ...prev,
        paymentMethod: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.stuId) {
      toast.error("Please select student");
      return;
    }

    if (!formData.amountPaid) {
      toast.error("Please enter amount paid");
      return;
    }

    if (remainingFees === 0) {
      toast.error("Fees already fully paid");
      return;
    }

    if (Number(formData.amountPaid) > remainingFees) {
      toast.error(`Maximum payable amount is ₹${remainingFees}`);
      return;
    }

    const result = await fetch("/collectFees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });

    const data = await result.json();

    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }

    setFormData({
      stuId: "",
      course: "",
      totalFees: "",
      amountPaid: "",
      paymentMethod: "",
      remarks: "",
    });

    setRemainingFees(0);
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
                  <Label className="mb-2 text-gray-700 font-medium">
                    Student Id
                  </Label>
                  <Select
                    value={formData.stuId}
                    onValueChange={(value) =>
                      handleSelectChange("stuId", value)
                    }
                  >
                    <SelectTrigger className="bg-white mt-2 w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400">
                      <SelectValue placeholder="Select Student Id" />
                    </SelectTrigger>
                    <SelectContent>
                      {students.map((student) => (
                        <SelectItem
                          key={student._id}
                          value={student.stuId}
                        >
                          {student.stuId}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Course (AUTO / READONLY) */}
                <div className="flex flex-col">
                  <Label className="mb-2 text-gray-700 font-medium">
                    Course
                  </Label>
                  <Select value={formData.course} disabled>
                    <SelectTrigger className="bg-white mt-2 w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 opacity-80 cursor-not-allowed">
                      <SelectValue placeholder="Course auto selected" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem
                          key={course.id}
                          value={course.name}
                        >
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Total Fee */}
                <div className="flex flex-col">
                  <Label className="mb-2 text-gray-700 font-medium">
                    Total Fee
                  </Label>
                  <Input
                    value={formData.totalFees}
                    readOnly
                    className="bg-white border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 mt-2"
                  />
                </div>

                {/* Amount Paid */}
                <div className="flex flex-col">
                  <Label className="mb-2 text-gray-700 font-medium">
                    Amount Paid
                  </Label>
                  <Input
                    type="number"
                    placeholder={
                      remainingFees > 0
                        ? `Max payable: ₹${remainingFees}`
                        : "Fees already cleared"
                    }
                    value={formData.amountPaid}
                    disabled={remainingFees === 0}
                    onChange={(e) => {
                      const val = e.target.value;

                      if (val === "") {
                        setFormData((p) => ({
                          ...p,
                          amountPaid: "",
                        }));
                        return;
                      }

                      const num = Number(val);

                      if (num <= 0) {
                        toast.error("Amount must be greater than 0");
                        return;
                      }

                      if (num > remainingFees) {
                        toast.error(
                          `Maximum payable amount is ₹${remainingFees}`
                        );
                        return;
                      }

                      setFormData((p) => ({
                        ...p,
                        amountPaid: num,
                      }));
                    }}
                    className="bg-white border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 mt-2"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="flex flex-col">
                <Label className="mb-2 text-gray-700 font-medium">
                  Payment Method
                </Label>
                <Select
                  value={formData.paymentMethod}
                  onValueChange={(value) =>
                    handleSelectChange("paymentMethod", value)
                  }
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
                <Label className="mb-2 text-gray-700 font-medium">
                  Remarks
                </Label>
                <Textarea
                  value={formData.remarks}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      remarks: e.target.value,
                    }))
                  }
                  className="bg-white border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 mt-2"
                />
              </div>

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
