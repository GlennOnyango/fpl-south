import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { useEffect, useMemo, useState } from "react";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { usePost } from "../customHooks/reactQuery/usePost";
import SelectDropdown from "react-native-select-dropdown";
import { ScrollView } from "react-native-gesture-handler";

type userCredntial = {
  phoneNumber: string;
  password: string;
  teamId: string;
  leagueId: string;
  email: string;
  userType: string;
};

type Props = {
  navigation: any;
};

export default function CreateAccount({ navigation }: Props) {
  const theme = useTheme();
  const { error, mutate, isError, isLoading, isSuccess } =
    usePost("/auth/register");
  const [credentials, setCredentials] = useState<userCredntial>({
    teamId: "",
    leagueId: "",
    phoneNumber: "",
    email: "",
    password: "",
    userType: "league participant",
  });

  const [showPassword, setShowPassword] = useState(true);

  const updateCredentials = (e: { type: string; text: string }) => {
    setCredentials({ ...credentials, [e.type]: e.text });
  };

  const dis = useMemo(() => {
    if (credentials.userType === "league admin") {
      return credentials.password.length > 7 &&
        credentials.email.length > 9 &&
        credentials.phoneNumber.length > 9 &&
        credentials.teamId.length > 0 &&
        credentials.leagueId.length > 0
        ? false
        : true;
    }

    if (credentials.userType === "league participant") {
      return credentials.password.length > 7 &&
        credentials.email.length > 9 &&
        credentials.phoneNumber.length > 9 &&
        credentials.teamId.length > 0
        ? false
        : true;
    }

    return false;
  }, [credentials]);

  useEffect(() => {
    console.log(dis);
  }, [dis]);

  if (isSuccess) {
    navigation.navigate("SignUpBoard");
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={style.container}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <MaterialIcons name="app-registration" size={102} color={"grey"} />

            <Text
              style={{
                color: theme.colors.secondary,
                marginVertical: 16,
              }}
              variant="titleLarge"
            >
              Create Account
            </Text>
          </View>

          <View style={style.containerGroup}>
            <SelectDropdown
              data={["Select user type", "league participant", "league admin"]}
              onSelect={(selectedItem, index) => {
                updateCredentials({
                  type: "userType",
                  text: selectedItem,
                });
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              renderDropdownIcon={() => (
                <MaterialCommunityIcons
                  name="menu-down"
                  size={20}
                  color={"grey"}
                />
              )}
              buttonStyle={{
                width: "100%",
                height: 50,
                backgroundColor: "#fff",
                borderBlockColor: "grey",
                borderRadius: 5,
                borderWidth: 1,
              }}
              buttonTextStyle={{
                color: "#000",
                textAlign: "left",
              }}
              dropdownStyle={{
                width: "94%",
                backgroundColor: theme.colors.background,
              }}
              rowStyle={{
                backgroundColor: theme.colors.background,
              }}
              defaultValueByIndex={0}
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
                updateCredentials({ type: "teamId", text: newText })
              }
              value={credentials.teamId}
              inputMode={"text"}
            />
          </View>

          {
            // if user type is league admin
            credentials.userType === "league admin" ? (
              <View style={style.containerGroup}>
                <TextInput
                  style={style.input}
                  label="League id"
                  mode="outlined"
                  onChangeText={(newText) =>
                    updateCredentials({ type: "leagueId", text: newText })
                  }
                  value={credentials.leagueId}
                  inputMode={"text"}
                />
              </View>
            ) : null
          }

          <View style={style.containerGroup}>
            <TextInput
              style={style.input}
              label="Password (min 8 characters)"
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
                  variant="labelLarge"
                  style={{ textAlign: "center", marginVertical: 10 }}
                >
                  {`${error?.response?.data?.error}` || "An error occured"}
                </Text>
              ) : null}

              <Button
                mode="outlined"
                onPress={() => {
                  if (!dis) {
                    mutate(credentials);
                  }
                }}
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
                  "Register"
                )}{" "}
              </Button>

              <Text style={{ textAlign: "center", marginVertical: 16 }}>
                I already have an account.{"  "}
                <Text
                  style={{ color: theme.colors.secondary }}
                  onPress={() => navigation.navigate("Login")}
                  variant="titleLarge"
                >
                  Login
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
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
