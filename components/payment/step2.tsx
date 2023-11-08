import { StyleSheet, View } from "react-native";
import PaymentContext from "../../context/payment";
import { Button, Text, useTheme, TextInput } from "react-native-paper";
import { useContext, useEffect, useMemo, useState } from "react";

type Props = {
  navigation: any;
};

type userCredntial = {
  phoneNumber: string;
  mpesaCode: string;
};

export default function Step2({ navigation }: Props) {
  const theme = useTheme();
  const payCtx = useContext(PaymentContext);
  const [credentials, setCredentials] = useState<userCredntial>({
    phoneNumber: "",
    mpesaCode: "",
  });

  const updateCredentials = (e: { type: string; text: string }) => {
    setCredentials({ ...credentials, [e.type]: e.text });
  };


  const pay = () => {
    payCtx.setPaymentDetails({
      ...payCtx.paymentDetails,
      mpesaToken: credentials.mpesaCode,
      phone: credentials.phoneNumber,
    });
  };

  return (
    <View style={style.container}>
      <View
        style={{
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Text variant="titleLarge" style={{ marginTop: 10 }}>
          Step 2
        </Text>
        <Text variant="labelLarge" style={{ marginVertical: 10 }}>
          Confirm completed payment
        </Text>
      </View>

      <View style={style.containerGroup}>
        <TextInput
          style={style.input}
          label="Amount"
          mode="outlined"
          value={`KSH ${payCtx.paymentDetails.amount.toString()}`}
          editable={false}
        />
      </View>

      <View style={style.containerGroup}>
        <TextInput
          style={style.input}
          label="Phone number you paid with"
          mode="outlined"
          onChangeText={(newText) =>
            updateCredentials({ type: "phoneNumber", text: newText })
          }
          value={credentials.phoneNumber}
          inputMode={"tel"}
          keyboardType={"phone-pad"}
          maxLength={12}
        />
      </View>

      <View style={style.containerGroup}>
        <TextInput
          style={style.input}
          label="MPESA transaction code"
          mode="outlined"
          onChangeText={(newText) =>
            updateCredentials({ type: "mpesaCode", text: newText })
          }
          value={credentials.mpesaCode}
        />
      </View>

      <View style={style.containerGroup}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 10,
          }}
        >
          <View
            style={{
              width: "48%",
              backgroundColor: "red",
            }}
          >
            <Button
              mode="elevated"
              buttonColor={theme.colors.secondary}
              textColor={"white"}
              onPress={() => {
                payCtx.setSteps(1);
              }}
              style={{
                borderRadius: 1,
              }}
            >
              Previous
            </Button>
          </View>

          <View
            style={{
              width: "48%",
              backgroundColor: "red",
            }}
          >
            <Button
              mode="elevated"
              buttonColor={theme.colors.secondary}
              textColor={"white"}
              style={{
                borderRadius: 1,
              }}
              onPress={pay}
            >
              Pay
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
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
