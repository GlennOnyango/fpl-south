import { StyleSheet } from "react-native";
import PaymentContext from "../../context/payment";
import { useContext, useEffect } from "react";
import Step1 from "../../components/payment/step1";
import Step2 from "../../components/payment/step2";

type Props = {
  navigation: any;
};

export default function MakePayment({ navigation }: Props) {
  const payCtx = useContext(PaymentContext);

  useEffect(() => {
    console.log(payCtx.paymentDetails);
  }, [payCtx.paymentDetails]);

  return <>
  {payCtx.steps === 1 && <Step1 navigation={navigation} />}
  {payCtx.steps === 2 && <Step2 navigation={navigation} />}
  </>;
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
  },

  input: {
    width: "100%",
    height: 50,
    borderBlockColor: "#1a237e",
  },
  containerGroup: {
    marginVertical: 5,
    paddingHorizontal: 2,
    width: "100%",
    paddingVertical: 2,
  },
});
