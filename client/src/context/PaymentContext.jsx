import React, { createContext, useContext, useEffect, useState } from "react";

const PaymentContext = createContext();

export default function PaymentProvider({ children }) {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const result = await fetch("/feesHistory", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await result.json();
      if (data.feesHistory) setPaymentHistory(data.feesHistory);
    } catch (err) {
      console.error("Error fetching payments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <PaymentContext.Provider value={{ paymentHistory, setPaymentHistory, loading, fetchPayments }}>
      {children}
    </PaymentContext.Provider>
  );
}

export const usePayments = () => useContext(PaymentContext);
