import React, { useEffect, useState } from "react";

import Payment from "@/components/Payment";
import { usePayments } from "@/context/PaymentContext";

const PaymentHistory = () => {
const {paymentHistory, setPaymentHistory} = usePayments();



  
  return (
    <div className="w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Payment History</h1>

      <div className="space-y-6">
      {paymentHistory.length === 0 ? (
          <p>No payment history available.</p>
        ) : (
          paymentHistory.map((payment) => <Payment key={payment._id} payment={payment} />)
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;