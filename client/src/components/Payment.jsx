import React from 'react';
import { Trash2, Edit } from "lucide-react"; 

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString([], {
    year: "numeric",
    month: "long", // 
    day: "2-digit",
  }) + " at " + date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

export default function Payment({ payment }) {
return (
  <div
    key={payment._id}
    className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-indigo-400"
  >
    {/* Top section: Payment Method & Amount */}
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold text-indigo-700">{payment.paymentMethod}</h2>
      <div className="text-lg font-bold text-gray-900">₹{payment.amountPaid}</div>
    </div>

    {/* Details section */}
    <div className="space-y-2 text-gray-700 text-sm">
      <p>
        <span className="font-semibold">Payment ID:</span> {payment._id}
      </p>
      <p>
        <span className="font-semibold">Student ID:</span> {payment.stuId}
      </p>
      <p>
        <span className="font-semibold">Remarks:</span> {payment.remarks || "None"}
      </p>
      <p>
        <span className="font-semibold">Date & Time:</span> {formatDate(payment.createdAt)}
      </p>
    </div>
  </div>
);

}
