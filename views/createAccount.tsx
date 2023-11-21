import { StyleSheet, Text, View } from "react-native";
import { Button, Card, Icon, TextInput, useTheme } from "react-native-paper";
import { useEffect, useMemo, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { usePost } from "../customHooks/reactQuery/usePost";
import SelectDropdown from "react-native-select-dropdown";
import { ScrollView } from "react-native-gesture-handler";

type userCredntial = {
  phoneNumber: string;
  password: string;
  teamID: string;
  leagueID: string;
  email: string;
  userType: string;
};

type Props = {
  navigation: any;
};

export default function CreateAccount({ navigation }: Props) {
  const theme = useTheme();
  const { data, error, reset, mutate, isLoading, isSuccess } =
    usePost("/auth/register");
  const [genericError, setGenericError] = useState<string>("");
  const [credentials, setCredentials] = useState<userCredntial>({
    phoneNumber: "",
    password: "",
    teamID: "",
    leagueID: "",
    email: "",
    userType: "league participant",
  });

  const [showPassword, setShowPassword] = useState(true);

  const updateCredentials = (e: { type: string; text: string }) => {
    setCredentials({ ...credentials, [e.type]: e.text });
  };

  const dis = useMemo(() => {
    if (credentials.userType === "league admin") {
      return credentials.password.length > 8 &&
        credentials.email.length > 9 &&
        credentials.phoneNumber.length > 9 &&
        credentials.teamID.length > 0 &&
        credentials.leagueID.length > 0
        ? false
        : true;
    }

    if (credentials.userType === "league participant") {
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
    <ScrollView>
      <View style={style.container}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <MaterialCommunityIcons
            name="security-network"
            size={102}
            color={theme.colors.secondary}
          />
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
              updateCredentials({ type: "teamID", text: newText })
            }
            value={credentials.teamID}
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
                  updateCredentials({ type: "leagueID", text: newText })
                }
                value={credentials.leagueID}
                inputMode={"text"}
              />
            </View>
          ) : null
        }

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
          {genericError.length > 0 ? (
            <Text
              style={{
                color: "red",
                textAlign: "center",
                marginVertical: 5,
              }}
            >
              {genericError}
            </Text>
          ) : null}
          <View
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Button
              mode="outlined"
              buttonColor={dis ? "#cccccc" : theme.colors.secondary}
              textColor="#fff"
              style={{
                height: 50,
                alignContent: "center",
                justifyContent: "center",
                borderColor: dis ? "#cccccc" : theme.colors.secondary,
              }}
              onPress={() => {
                if (!dis) {
                  setGenericError("Fill all fields to register");
                  return;
                } else {
                  mutate(credentials);
                }
              }}
            >
              Register
            </Button>

            <Text style={{ textAlign: "center", marginVertical: 16 }}>
              I already have an account.{" "}
              <Text
                style={{ color: theme.colors.secondary }}
                onPress={() => navigation.navigate("Login")}
              >
                Access my account.
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
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
