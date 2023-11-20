import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput, useTheme } from "react-native-paper";
import { useContext, useEffect, useMemo, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { usePost } from "../customHooks/reactQuery/usePost";
import AuthContext from "../context/authcontext";
import * as SecureStore from "expo-secure-store";

type userCredntial = {
  email: string;
  password: string;
};

type Props = {
  navigation: any;
};

export default function Login({ navigation }: Props) {
  const theme = useTheme();
  const authCTX = useContext(AuthContext);

  //check if user is logged in
  if (authCTX.userDetails.token.length > 0) {
    navigation.navigate("Dashboard");
  }

  if (authCTX.userDetails.token.length === 0) {
    //get user from secure store
    SecureStore.getItemAsync("user").then((user) => {
      if (user) {
        authCTX.setUserDetails(JSON.parse(user));
        navigation.navigate("Dashboard");
      }
    });
  }

  const { data, error, mutate, isError, isLoading, isSuccess } =
    usePost("/auth/login");
  const [credentials, setCredentials] = useState<userCredntial>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(true);

  const updateCredentials = (e: { type: string; text: string }) => {
    setCredentials({ ...credentials, [e.type]: e.text });
  };

  const dis = useMemo(() => {
    if (credentials.password.length > 0 || credentials.email.length > 0) {
      return credentials.password.length > 8 && credentials.email.length > 9
        ? false
        : true;
    }
    return false;
  }, [credentials]);

  const login = async () => {
    //check password and phone number if populated

    if (!dis) {
      if (credentials.password.length > 0 && credentials.email.length > 0) {
        mutate(credentials);
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      //save user details to context

      if (data?.data.token) {
        const userData = data?.data.data;
        const token = data?.data.token;

        const user = {
          phone: userData.phone,
          teamid: userData.teamid,
          email: userData.email,
          teamName: userData.teamName,
          token: token,
        };
        authCTX.setUserDetails(user);

        //navigate to dashboard

        navigation.navigate("Dashboard");
      }
    }
  }, [data, isSuccess]);

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
          label="Email"
          mode="outlined"
          onChangeText={(newText) =>
            updateCredentials({ type: "email", text: newText })
          }
          value={credentials.email}
          inputMode={"email"}
          keyboardType={"default"}
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
            <Button mode="outlined" onPress={login}>
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
      {isLoading ? <Text>{"Loading..."}</Text> : null}
      {isError ? <Text>{`Login failed try again.${error}`}</Text> : null}
      {dis ? <Text>{"Fill the text filleds to login"}</Text> : null}
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
