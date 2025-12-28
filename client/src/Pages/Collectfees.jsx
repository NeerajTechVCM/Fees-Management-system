import { useState, useEffect } from "react";
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
  const { paymentHistory, fetchPayments } = usePayments();

  const [remainingFees, setRemainingFees] = useState(0);

  const [formData, setFormData] = useState({
    stuId: "",
    course: "",
    totalFees: "",
    amountPaid: "",
    paymentMethod: "",
    remarks: "",
  });

  // ---------------- STUDENT SELECT ----------------
  const handleStudentSelect = (stuId) => {
    try {
      const student = students.find((s) => s.stuId === stuId);
      if (!student) throw new Error("Student not found");

      const courseObj = courses.find((c) => c.name === student.courseName);
      if (!courseObj) throw new Error("Course not found");

      const totalFees = Number(courseObj.fees);

      const alreadyPaid = paymentHistory
        .filter((p) => p.stuId === stuId)
        .reduce((sum, p) => sum + Number(p.amountPaid || 0), 0);

      const remaining = totalFees - alreadyPaid;

      setRemainingFees(remaining > 0 ? remaining : 0);

      setFormData((prev) => ({
        ...prev,
        stuId,
        course: student.courseName,
        totalFees,
        amountPaid: "",
      }));
    } catch (err) {
      alert(err.message); // phone-friendly error
    }
  };

  // ---------------- INPUT CHANGE ----------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "amountPaid") {
      const num = Number(value);
      if (isNaN(num)) return;

      if (num < 0) {
        toast.error("Amount cannot be negative");
        return;
      }

      if (num > remainingFees) {
        toast.error(`Maximum payable amount is ₹${remainingFees}`);
        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const paid = Number(formData.amountPaid);
      if (!paid || paid <= 0) {
        toast.error("Enter valid amount");
        return;
      }

      if (paid > remainingFees) {
        toast.error(`Maximum payable amount is ₹${remainingFees}`);
        return;
      }

      const result = await fetch("/collectFees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await result.json();

      if (data.success) {
        toast.success(data.message);
        fetchPayments(); // refresh payment context
      } else {
        toast.error(data.message);
      }

      // Reset form
      setFormData({
        stuId: "",
        course: "",
        totalFees: "",
        amountPaid: "",
        paymentMethod: "",
        remarks: "",
      });
      setRemainingFees(0);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  // ---------------- RENDER ----------------
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
                {students.length > 0 && (
                  <div className="flex flex-col">
                    <Label className="mb-2 text-gray-700 font-medium">
                      Student Id
                    </Label>
                    <Select
                      value={formData.stuId}
                      onValueChange={handleStudentSelect}
                    >
                      <SelectTrigger className="bg-white mt-2 w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400">
                        <SelectValue placeholder="Select Student Id" />
                      </SelectTrigger>
                      <SelectContent>
                        {students.map((s) => (
                          <SelectItem key={s._id} value={s.stuId}>
                            {s.stuId}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Course (auto, readonly) */}
                <div className="flex flex-col">
                  <Label className="mb-2 text-gray-700 font-medium">
                    Course
                  </Label>
                  <Input
                    value={formData.course}
                    readOnly
                    className="bg-white border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 mt-2"
                  />
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
                    name="amountPaid"
                    type="number"
                    placeholder={
                      formData.stuId
                        ? `Max ₹${remainingFees}`
                        : "Select student first"
                    }
                    value={formData.amountPaid}
                    onChange={handleChange}
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
                  onValueChange={(v) =>
                    setFormData((p) => ({ ...p, paymentMethod: v }))
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