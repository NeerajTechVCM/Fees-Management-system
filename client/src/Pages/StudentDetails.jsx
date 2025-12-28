import React, { useEffect, useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useStudents } from "@/context/StudentContext";
import { usePayments } from "@/context/PaymentContext";

const StudentDetails = () => {
  const { id } = useParams();

  const {students, setStudents} = useStudents();
  const [selectStudents, setSelectStudents] = useState(null);
  const {paymentHistory, setPaymentHistory} = usePayments();
  const [selectPaymentHistory, setSelectPaymentHistory] = useState([]);

  useEffect(() => {
    const selectedStudent = students.find((student) => student._id === id);
    setSelectStudents(selectedStudent);
  }, [id, students]);

  useEffect(() => {
    if (selectStudents) {
      const studentFees = paymentHistory.filter(fee => fee.stuId === selectStudents.stuId);
      setSelectPaymentHistory(studentFees);
    }
  }, [selectStudents, paymentHistory]);

  const totalAmountPaid = selectPaymentHistory.reduce((acc, fee) => acc + Number(fee.amountPaid), 0);
  const pendingFees = selectStudents ? selectStudents.fees - totalAmountPaid : 0;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString([], {
      year: "numeric",
      month: "long",
      day: "2-digit",
    }) + " at " + date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

return (
  <>
    {/* Student Profile Card */}
    <div className="w-full mx-auto bg-gradient-to-br from-indigo-50 via-indigo-100 to-white shadow-lg rounded-2xl overflow-hidden">
      {/* Profile Image */}
      <div className="flex items-center justify-center p-6">
        <div className="border-4 border-indigo-500 rounded-full p-1 shadow-lg">
          <img
            src={selectStudents?.stuImg}
            alt="Profile"
            className="h-48 w-48 rounded-full object-cover"
          />
        </div>
      </div>

      {/* Student Info */}
      <div className="px-6 py-4 space-y-1">
        {selectStudents ? (
          <>
            <h2 className="text-3xl font-bold text-indigo-800">{selectStudents.fullName}</h2>
            <p className="text-gray-600">Student ID: {selectStudents.stuId}</p>
            <p className="text-gray-600">Email: {selectStudents.email}</p>
            <p className="text-gray-600">Phone: {selectStudents.phone}</p>
            <p className="text-gray-600">Course: {selectStudents.courseName}</p>
            <p className="text-gray-600">Session: {selectStudents.session}</p>
            <p className="text-gray-600">Total Fees: ₹{selectStudents.fees}</p>
            <p className="text-gray-600">Paid: ₹{totalAmountPaid}</p>
            <p className="text-gray-600">Pending Fees: ₹{pendingFees}</p>
          </>
        ) : (
          <p className="text-gray-500">Loading student details...</p>
        )}
      </div>

      {/* Edit Button */}
      <div className="flex justify-end px-6 py-3 bg-indigo-50">
        <Link
          to={`/editStudent/${selectStudents?._id}`}
          className="flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-800 transition"
        >
          <Edit size={20} />
          Edit
        </Link>
      </div>
    </div>

    {/* Payment History */}
    <div className="mt-8 px-6">
      {selectPaymentHistory.length === 0 ? (
        <p className="text-gray-500">No payment history available</p>
      ) : (
        selectPaymentHistory.map((fees) => (
          <div
            key={fees._id}
            className="flex items-center mt-6 mb-4 border-l-4 border-indigo-400 bg-indigo-50 p-4 rounded-lg shadow-sm"
          >
            <img
              src={selectStudents?.stuImg}
              alt="Student"
              className="w-16 h-16 rounded-full border-2 border-indigo-500 mr-4 object-cover"
            />
            <div className="flex-1 space-y-1">
              <p className="text-sm text-gray-700">StuId: {fees.stuId}</p>
              <p className="text-sm text-gray-700">Amount Paid: ₹{fees.amountPaid}</p>
              <p className="text-sm text-gray-700">Remarks: {fees.remarks}</p>
              <p className="text-sm text-gray-700">Date: {formatDate(fees.createdAt)}</p>
            </div>
          </div>
        ))
      )}
    </div>
  </>
);

};

export default StudentDetails;