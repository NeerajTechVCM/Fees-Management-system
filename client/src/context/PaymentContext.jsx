import React, { createContext, useContext, useEffect, useState } from 'react'

 const PaymentContext=createContext();
 

export default function PaymentProvider({children}) {
const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    const fetchFees = async () => {
      const result = await fetch("/feesHistory", {
        method: "GET",
        headers: {
          "Content-Type": 'application/json',
        },
        credentials: 'include',
      });

      const data = await result.json();
      
      if (data.feesHistory) {
        setPaymentHistory(data.feesHistory);
      }
    };

    fetchFees();
  }, []);
  return (
   <PaymentContext.Provider value={[paymentHistory,setPaymentHistory]}>
    {children}
   </PaymentContext.Provider>
  )
}




export const usePayments=()=>useContext(PaymentContext);