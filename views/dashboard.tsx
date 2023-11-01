import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button, Card, TextInput, useTheme } from "react-native-paper";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  navigation: any;
};

const { width, height } = Dimensions.get("window");

export default function Dashboard({ navigation }: Props) {
  const theme = useTheme();

  const imageDashboard = require("../assets/dashborad/fplegypt.jpg");
  return (
    <View style={style.container}>
      <Card
        elevation={1}
        style={{
          alignItems: "center",
          borderRadius: 0,
          backgroundColor: "#ff1753",
        }}
      >
        <ImageBackground
          style={{ width: width * 0.9, height: height * 0.3, padding: 0 }}
          resizeMode="cover"
          resizeMethod="resize"
          source={imageDashboard}
        ></ImageBackground>
      </Card>

      <View style={{ display: "flex", flexDirection: "row", marginTop: 4 }}>
        <Card
          elevation={1}
          style={{
            alignItems: "center",
            borderRadius: 0,
            backgroundColor: "#fff",
            flex: 1,
          }}
        >
          <Card.Content>
            <Text
              style={{
                textAlign: "center",
                color: "#000",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              General statistics
            </Text>
          </Card.Content>
        </Card>
        <Card
          elevation={1}
          style={{
            alignItems: "center",
            borderRadius: 0,
            flex: 1,
          }}
        >
          <Card.Content>
            <Text
              style={{
                textAlign: "center",
                color: "#fff",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              League Statistics
            </Text>
          </Card.Content>
        </Card>
      </View>

      <View style={{ display: "flex", flexDirection: "row", marginTop: 4 }}>
        <Card
          elevation={1}
          style={{
            alignItems: "center",
            borderRadius: 0,
            backgroundColor: "#fff",
            flex: 1,
          }}
        >
          <Card.Content>
            <Text
              style={{
                textAlign: "center",
                color: "#000",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Make Payments
            </Text>
          </Card.Content>
        </Card>
        <Card
          elevation={1}
          style={{
            alignItems: "center",
            borderRadius: 0,
            flex: 1,
          }}
        >
          <Card.Content>
            <Text
              style={{
                textAlign: "center",
                color: "#fff",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Check payments
            </Text>
          </Card.Content>
        </Card>
      </View>


      <View style={{ display: "flex", flexDirection: "row", marginTop: 4 }}>
        <Card
          elevation={1}
          style={{
            alignItems: "center",
            borderRadius: 0,
            backgroundColor: "#fff",
            flex: 1,
          }}
        >
          <Card.Content>
            <Text
              style={{
                textAlign: "center",
                color: "#000",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Make Payments
            </Text>
          </Card.Content>
        </Card>
        <Card
          elevation={1}
          style={{
            alignItems: "center",
            borderRadius: 0,
            flex: 1,
          }}
        >
          <Card.Content>
            <Text
              style={{
                textAlign: "center",
                color: "#fff",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Check payments
            </Text>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
  },
});
