import React, { useState, useEffect } from "react";

type Props = {
  children: JSX.Element;
};

const paymentCTX = {
  paymentDetails: {
    paymentType: "",
    phone: "",
    weeks: "",
    amount: "",
    mpesaToken: "",
  },
  setPaymentDetails: (paymentDetails: any) => {},
  
};

const PaymentContext = React.createContext(paymentCTX);

export const PaymentContextProvider = ({ children }: Props) => {
 
  const [payment, setPayment] = useState({
    paymentType: "",
    phone: "",
    weeks: "",
    amount: "",
    mpesaToken: "",
  });


  return (
    <PaymentContext.Provider
      value={{
        paymentDetails: payment,
        setPaymentDetails: (paymentDetails: any) => {
          setPayment(paymentDetails);
        },
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export default PaymentContext;
