import { StyleSheet, View } from "react-native";
import PaymentContext from "../../context/payment";
import { Button, Text, SegmentedButtons, useTheme } from "react-native-paper";
import { useContext, useEffect, useMemo, useState } from "react";

type Props = {
  navigation: any;
};

export default function Step1({ navigation }: Props) {
  const theme = useTheme();
  const payCtx = useContext(PaymentContext);
  const [value, setValue] = useState<string[]>([]);
  const [weeks, setWeeks] = useState<string[]>([]);

  const amountToPay = useMemo(() => {
    let total = 0;
    if (value.includes("all")) {
      return 310;
    }

    if (value.includes("month")) {
      total += 100;
    }

    if (value.includes("week")) {
      total += weeks.length * 70;
    }

    return total;
  }, [value, weeks]);

  const payClick = () => {
    const payDetails = {
      paymentType: value.join(","),
      phone: "",
      weeks: weeks.join(","),
      amount: amountToPay,
      mpesaToken: "",
    };
    payCtx.setPaymentDetails(payDetails);
    payCtx.setSteps(2);
  };

  useEffect(() => {
    console.log(payCtx.paymentDetails);
  }, [payCtx.paymentDetails]);


  return (
    <View style={style.container}>
      <View
        style={{
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Text variant="titleLarge" style={{ marginTop: 10 }}>
          Step 1
        </Text>
        <Text variant="labelLarge" style={{ marginVertical: 10 }}>
          Choose game week(s) or month to pay.
        </Text>
        
      </View>

      <View style={style.containerGroup}>
        <Text variant="titleMedium" style={{ marginBottom: 10 }}>
          Select bill to pay :
        </Text>

        <SegmentedButtons
          multiSelect={true}
          value={value}
          onValueChange={(newValue) => {
            //get last value
            const lastValue = newValue[newValue.length - 1];

            if (lastValue === "all") {
              setValue(["all"]);
              return;
            } else {
              const index = newValue.indexOf("all");
              if (index > -1) {
                newValue.splice(index, 1);
              }
              setValue(newValue);
              return;
            }
          }}
          buttons={[
            {
              value: "all",
              label: "All",
              showSelectedCheck: true,
            },
            {
              value: "month",
              label: "Month",
              showSelectedCheck: true,
            },
            { value: "week", label: "Weekly", showSelectedCheck: true },
          ]}
        />
      </View>

      {value.includes("week") ? (
        <View style={style.containerGroup}>
          <Text variant="titleMedium" style={{ marginBottom: 10 }}>
            Select Weeks to pay:
          </Text>

          <SegmentedButtons
            multiSelect={true}
            value={weeks}
            density="small"
            onValueChange={setWeeks}
            buttons={[
              {
                value: "11",
                label: "11",
                showSelectedCheck: true,
              },
              { value: "12", label: "12", showSelectedCheck: true },
              { value: "13", label: "13", showSelectedCheck: true },
              { value: "14", label: "14", showSelectedCheck: true },
            ]}
          />
        </View>
      ) : null}

      <View style={style.containerGroup}>
        <View style={{ paddingHorizontal: 4 }}>
          <Text variant="titleMedium" style={{ marginTop: 8 }}>
            Amount to pay : {amountToPay} ksh
          </Text>
        </View>
      </View>

      <View style={style.containerGroup}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
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
              onPress={payClick}
              style={{
                borderRadius: 1,
              }}
            >
              Next
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
