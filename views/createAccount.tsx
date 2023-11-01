import { StyleSheet, Text, View } from "react-native";
import { Button, Card, TextInput, useTheme } from "react-native-paper";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type userCredntial = {
  phoneNumber: string;
  password: string;
};

type Props = {
    navigation: any;
    
}

export default function CreateAccount({navigation}: Props) {
  const theme = useTheme();
  const [credentials, setCredentials] = useState<userCredntial>({
    phoneNumber: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(true);

  const updateCredentials = (e: { type: string; text: string }) => {
    setCredentials({ ...credentials, [e.type]: e.text });
  };

  return (
    <View style={style.container}>
      <Card style={style.card}>
        <Card.Content>
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
              label="Full name"
              mode="outlined"
              onChangeText={(newText) =>
                updateCredentials({ type: "fullName", text: newText })
              }
              value={credentials.phoneNumber}
              inputMode={"text"}
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
              value={credentials.phoneNumber}
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
                  mode="elevated"
                  buttonColor={theme.colors.secondary}
                  textColor={"white"}
                  onPress={() => console.log("Pressed")}
                  disabled={false}
                  style={{
                    borderRadius: 1,
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
                  mode="elevated"
                  buttonColor={theme.colors.secondary}
                  textColor={"white"}
                  onPress={() => navigation.navigate("Login")}
                  style={{
                    borderRadius: 1,
                  }}
                >
                  Login
                </Button>
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
  },

  input: {
    width: "100%",
    height: 50,
    borderBlockColor:"#1a237e"
  },
  containerGroup: {
    marginVertical: 5,
    paddingHorizontal: 2,
    width: "100%",
    paddingVertical: 2,
  },
});
