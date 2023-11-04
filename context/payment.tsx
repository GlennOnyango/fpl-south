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
  steps: 1,
  setSteps: (steps: number) => {},
};

const PaymentContext = React.createContext(paymentCTX);

export const PaymentContextProvider = ({ children }: Props) => {
 
  const [payment, setPayment] = useState({
    paymentType: "",
    phone: "",
    weeks: "",
    amount: "",
    mpesaToken: "",
    teamid: 0,
  });
  const [steps, setSteps] = useState(1);


  return (
    <PaymentContext.Provider
      value={{
        paymentDetails: payment,
        setPaymentDetails: (paymentDetails: any) => {
          setPayment(paymentDetails);
        },
        steps: steps,
        setSteps: (steps: number) => {
          setSteps(steps);
        },
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export default PaymentContext;
