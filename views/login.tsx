import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { useContext, useEffect, useMemo, useState } from "react";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { usePost } from "../customHooks/reactQuery/usePost";
import AuthContext from "../context/authcontext";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";

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
    if (authCTX.userDetails.admin) {
      navigation.navigate("AdminDashboard");
    } else {
      navigation.navigate("Dashboard");
    }
  }

  if (authCTX.userDetails.token.length === 0) {
    //get user from secure store
    SecureStore.getItemAsync("user").then((user) => {
      if (user) {
        const userData = JSON.parse(user);
        authCTX.setUserDetails(userData);
        
        if (userData.userDetails.admin) {
          navigation.navigate("AdminDashboard");
        } else {
          navigation.navigate("Dashboard");
        }
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
    return credentials.password.length > 7 && credentials.email.length > 9
      ? false
      : true;
  }, [credentials]);

  const login = async () => {
    //check password and phone number if populated

    if (!dis) {
      mutate(credentials);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      //save user details to context

      if (data?.data.token) {
        const userData = data?.data.data;
        const token = data?.data.token;

        if (userData.approved) {
          const user = {
            phone: userData.phone,
            teamid: userData.teamid,
            email: userData.email,
            teamName: userData.teamName,
            approved: userData.approved,
            admin: userData.admin,
            token: token,
          };
          authCTX.setUserDetails(user);
          //navigate to dashboard

          if (user.admin) {
            console.log("admin");
            navigation.navigate("AdminDashboard");
          } else {
            console.log("not admin");
            navigation.navigate("Dashboard");
          }
        } else {
          authCTX.logout();
          navigation.navigate("SignUpBoard");
        }
      }
    }
  }, [data, isSuccess]);

  return (
    <>
      <View style={style.container}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Entypo name="colours" size={102} color={"grey"} />

          <Text
            style={{
              color: theme.colors.secondary,
              marginVertical: 16,
            }}
            variant="titleLarge"
          >
            Welcome Back!
          </Text>
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
              flexDirection: "column",
            }}
          >
            {isError ? (
              <Text
                style={{
                  textAlign: "center",
                  color: theme.colors.error,
                  marginVertical: 16,
                }}
                variant="bodySmall"
              >
                {`${error?.response?.data?.error}` || "An error occured"}
              </Text>
            ) : null}

            <Text
              style={{
                color: theme.colors.secondary,
                marginVertical: 16,
                textAlign: "right",
              }}
              variant="bodyLarge"
              onPress={() => navigation.navigate("CreateAccount")}
            >
              Forgot password
            </Text>

            <Button
              mode="outlined"
              onPress={login}
              buttonColor={dis ? "#cccccc" : theme.colors.secondary}
              textColor="#fff"
              style={{
                height: 50,
                alignContent: "center",
                justifyContent: "center",
                borderColor: dis ? "#cccccc" : theme.colors.secondary,
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator
                  animating={true}
                  color={theme.colors.secondary}
                />
              ) : (
                "Login"
              )}{" "}
            </Button>

            <Text
              style={{ textAlign: "center", marginVertical: 16 }}
              variant="bodyLarge"
            >
              Don't have an account?{"  "}
              <Text
                style={{ color: theme.colors.secondary }}
                onPress={() => navigation.navigate("CreateAccount")}
                variant="titleLarge"
              >
                Signup
              </Text>
            </Text>
          </View>
        </View>
      </View>

      <StatusBar backgroundColor="transparent" style="dark" animated />
    </>
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
