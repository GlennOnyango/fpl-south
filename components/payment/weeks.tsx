import { Dimensions, StyleSheet, View } from "react-native";
import PaymentContext from "../../context/payment";
import { Button, Text, SegmentedButtons, useTheme } from "react-native-paper";
import { useContext, useEffect, useMemo, useState } from "react";
import { TouchableHighlight } from "react-native-gesture-handler";

type Props = {
  navigation: any;
};

const { width, height } = Dimensions.get("window");

export default function Weeks({ navigation }: Props) {
  const theme = useTheme();

  const weekItem = (weeknumber: number) => {
    return (
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        style={style.touchSurface}
        onPress={() => navigation.navigate("CheckPayments")}
      >
        <View style={style.containerGroup}>
          <Text>{weeknumber}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  const allWeeks = useMemo(() => {
    let weeks = [];
    for (let i = 1; i <= 38; i++) {
      weeks.push(weekItem(i));
    }
    return weeks;
  }, []);

  return <View style={style.container}>
    {allWeeks.map((week) => week)}
  </View>;
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
  touchSurface: {
    flex: 1,
    height: height * 0.15,
    width: width * 0.4,
    borderRadius: 4,
    margin: 4,
  },
  containerGroup: {
    marginVertical: 5,
    paddingHorizontal: 2,
    width: "100%",
    paddingVertical: 2,
  },
});
