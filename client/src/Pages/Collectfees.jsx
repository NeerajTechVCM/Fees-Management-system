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

  const getTotalPaidByStudent = (stuId) => {
    if (!stuId) return 0;
    return payments
      .filter((p) => String(p.stuId) === String(stuId))
      .reduce((sum, p) => sum + Number(p.amountPaid || 0), 0);
  };

  const handleStudentSelect = (value) => {
    const stuId = String(value);

    const student = students.find(
      (s) => String(s.stuId) === stuId
    );

    // reset if invalid
    if (!student) {
      setFormData({
        stuId: "",
        course: "",
        totalFees: "",
        amountPaid: "",
        paymentMethod: "",
        remarks: "",
      });
      setRemainingFees(0);
      return;
    }

    const courseObj = courses.find(
      (c) => c.name === student.course
    );

    if (!courseObj) return;

    const totalFees = Number(courseObj.fees);
    const alreadyPaid = getTotalPaidByStudent(stuId);
    const remaining = totalFees - alreadyPaid;

    setFormData((prev) => ({
      ...prev,
      stuId,
      course: student.course,     // auto select
      totalFees,                  // auto set
      amountPaid: "",
    }));

    setRemainingFees(remaining > 0 ? remaining : 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.stuId) {
      toast.error("Please select student");
      return;
    }

    if (!formData.amountPaid) {
      toast.error("Please enter amount");
      return;
    }

    if (Number(formData.amountPaid) > remainingFees) {
      toast.error(`Maximum payable ₹${remainingFees}`);
      return;
    }

    const res = await fetch("/collectFees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    data.success
      ? toast.success(data.message)
      : toast.error(data.message);

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
                {/* Student ID */}
                <div>
                  <Label>Student Id</Label>
                  <Select
                    value={formData.stuId}
                    onValueChange={handleStudentSelect}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select Student Id" />
                    </SelectTrigger>
                    <SelectContent>
                      {students.map((s) => (
                        <SelectItem
                          key={s._id}
                          value={String(s.stuId)}
                        >
                          {s.stuId}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Course (AUTO, HIDDEN UNTIL ID) */}
                <div>
                  <Label>Course</Label>
                  <Select
                    value={formData.course}
                    disabled
                  >
                    <SelectTrigger className="mt-2 opacity-80 cursor-not-allowed">
                      <SelectValue placeholder="Auto selected" />
                    </SelectTrigger>
                  </Select>
                </div>

                {/* Total Fees (AUTO, HIDDEN UNTIL ID) */}
                <div>
                  <Label>Total Fee</Label>
                  <Input
                    readOnly
                    value={formData.totalFees}
                    placeholder="Auto calculated"
                    className="mt-2"
                  />
                </div>

                {/* Amount Paid */}
                <div>
                  <Label>Amount Paid</Label>
                  <Input
                    type="number"
                    value={formData.amountPaid}
                    disabled={!formData.stuId || remainingFees === 0}
                    placeholder={
                      formData.stuId
                        ? `Max ₹${remainingFees}`
                        : "Select student first"
                    }
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (val > remainingFees) {
                        toast.error(`Max ₹${remainingFees}`);
                        return;
                      }
                      setFormData((p) => ({
                        ...p,
                        amountPaid: e.target.value,
                      }));
                    }}
                    className="mt-2"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <Label>Payment Method</Label>
                <Select
                  value={formData.paymentMethod}
                  onValueChange={(v) =>
                    setFormData((p) => ({
                      ...p,
                      paymentMethod: v,
                    }))
                  }
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select Payment Method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="card">Card</SelectItem>
                    <SelectItem value="bank">Bank</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Remarks */}
              <div>
                <Label>Remarks</Label>
                <Textarea
                  value={formData.remarks}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      remarks: e.target.value,
                    }))
                  }
                  className="mt-2"
                />
              </div>

              <Button className="w-full">
                Submit Payment
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
