import { StyleSheet, Text, View } from "react-native";
import { Button, Card, TextInput, useTheme } from "react-native-paper";
import { useEffect, useMemo, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { usePost } from "../customHooks/usePost";
import * as Network from "expo-network";

type userCredntial = {
  phoneNumber: string;
  password: string;
};

type Props = {
  navigation: any;
};

export default function Login({ navigation }: Props) {
  const theme = useTheme();
  const [data, callApi, isLoading, errMessage] = usePost();
  const [credentials, setCredentials] = useState<userCredntial>({
    phoneNumber: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(true);

  const updateCredentials = (e: { type: string; text: string }) => {
    setCredentials({ ...credentials, [e.type]: e.text });
  };

  const dis = useMemo(() => {
    if (credentials.password.length > 0 || credentials.phoneNumber.length > 0) {
      return credentials.password.length > 8 &&
        credentials.phoneNumber.length > 9
        ? false
        : true;
    }
    return false;
  }, [credentials]);

  const login = async () => {
    //check password and phone number if populated

    if (!dis) {
      if (
        credentials.password.length > 0 &&
        credentials.phoneNumber.length > 9
      ) {
        callApi(credentials, "users");
      }
    }
  };

  return (
    <View style={style.container}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <MaterialCommunityIcons
          name="security"
          size={102}
          color={theme.colors.secondary}
        />
      </View>

      <View style={style.containerGroup}>
        <TextInput
          style={style.input}
          label="Phone number"
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
          label="Password"
          mode="outlined"
          onChangeText={(newText) =>
            updateCredentials({ type: "password", text: newText })
          }
          value={credentials.password}
          textContentType={"password"}
          secureTextEntry={showPassword}
          right={
            <TextInput.Icon
              icon="eye"
              onPress={(e) => setShowPassword(!showPassword)}
              forceTextInputFocus={false}
            />
          }
        />
      </View>

      <View style={style.containerGroup}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <View
            style={{
              width: "48%",
            }}
          >
            <Button mode="outlined" onPress={()=>navigation.navigate("Dashboard")}>
              Login
            </Button>
          </View>

          <View
            style={{
              width: "48%",
            }}
          >
            <Button
              mode="outlined"
              onPress={() => navigation.navigate("CreateAccount")}
            >
              Register
            </Button>
          </View>
        </View>
      </View>

      {dis ? <Text >{"Fill the text filleds to login"}</Text> : null}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 30,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
  },

  input: {
    width: "100%",
    height: 50,
  },
  containerGroup: {
    marginVertical: 5,
    paddingHorizontal: 2,
    width: "100%",
    paddingVertical: 2,
  },
  btn: {
    borderColor: "blue",
  },
  btnDisabled: {
    borderColor: "grey",
  },
});
