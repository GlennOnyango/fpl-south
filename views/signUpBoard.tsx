import { StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

type Props = {
  navigation: any;
};

export default function SignUpBoard({ navigation }: Props) {
  const theme = useTheme();

  return (
    <View style={style.container}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <AntDesign
          name="checkcircleo"
          size={102}
          color={theme.colors.secondary}
        />

        <Text
          style={{
            color: "black",
            marginVertical: 16,
            textAlign: "center",
          }}
          variant="titleLarge"
        >
          Thank you for registering! Please wait for your account to be approved
          by the league admin.
        </Text>
      </View>

      <View style={style.containerGroup}>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Button
            mode="outlined"
            buttonColor={theme.colors.secondary}
            textColor="#fff"
            style={{
              height: 50,
              alignContent: "center",
              justifyContent: "center",
              borderColor: theme.colors.secondary,
            }}
            onPress={() => navigation.navigate("Login")}
          >
            Go home
          </Button>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingTop: 20,
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
  btnActive: {
    backgroundColor: "#1a237e",
  },
});
