import { StyleSheet, Text, View } from "react-native";
import { Button, Card, TextInput, useTheme } from "react-native-paper";
import { useEffect, useMemo, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { usePost } from "../customHooks/reactQuery/usePost";

type userCredntial = {
  phoneNumber: string;
  password: string;
  teamID: string;
  email: string;
};

type Props = {
  navigation: any;
};

export default function CreateAccount({ navigation }: Props) {
  const theme = useTheme();
  const { data, error, reset, mutate, isLoading, isSuccess } =
    usePost("/auth/register");
  const [credentials, setCredentials] = useState<userCredntial>({
    phoneNumber: "",
    password: "",
    teamID: "",
    email: "",
  });

  const [showPassword, setShowPassword] = useState(true);

  const updateCredentials = (e: { type: string; text: string }) => {
    setCredentials({ ...credentials, [e.type]: e.text });
  };

  const dis = useMemo(() => {
    if (
      credentials.password.length > 0 ||
      credentials.email.length > 0 ||
      credentials.phoneNumber.length > 0 ||
      credentials.teamID.length > 0
    ) {
      return credentials.password.length > 8 &&
        credentials.email.length > 9 &&
        credentials.phoneNumber.length > 9 &&
        credentials.teamID.length > 0
        ? false
        : true;
    }
    return false;
  }, [credentials]);

  if (isSuccess) {
    navigation.navigate("Login");
  }

  // useEffect(() => {

  //   if (error) {
  //     reset();
  //   }

  //   if (data) {
  //     reset();
  //   }

  // }, [data, error, isLoading, isSuccess]);

  return (
    <View style={style.container}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <MaterialCommunityIcons
          name="security-network"
          size={102}
          color={theme.colors.secondary}
        />
      </View>

      <View style={style.containerGroup}>
        <TextInput
          style={style.input}
          label="email"
          mode="outlined"
          onChangeText={(newText) =>
            updateCredentials({ type: "email", text: newText })
          }
          value={credentials.email}
          inputMode={"email"}
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
          label="Team id"
          mode="outlined"
          onChangeText={(newText) =>
            updateCredentials({ type: "teamID", text: newText })
          }
          value={credentials.teamID}
          inputMode={"text"}
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
        {dis ? (
          <Text style={{ color: theme.colors.error }}>{"Fill all fields"}</Text>
        ) : null}
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
            <Button
              mode="outlined"
              onPress={() => {
                if (!dis) {
                  return;
                } else {
                  mutate(credentials);
                }
              }}
            >
              Register
            </Button>
          </View>

          <View
            style={{
              width: "48%",
            }}
          >
            <Button
              mode="outlined"
              onPress={() => navigation.navigate("Login")}
            >
              Login
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
