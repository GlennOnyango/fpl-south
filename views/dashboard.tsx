import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Card, useTheme } from "react-native-paper";

type Props = {
  navigation: any;
};

const { width, height } = Dimensions.get("window");

export default function Dashboard({ navigation }: Props) {
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

      <View style={style.cardHouse}>
        <Card
          elevation={1}
          style={{
            alignItems: "center",
            borderRadius: 0,
            backgroundColor: "#fff",
            flex: 1,
          }}
        >
          <Card.Content style={style.cardContent}>
            <Text
              style={{
                textAlign: "center",
                color: "#000",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Monthly statistics
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
          onPress={() => navigation.navigate("LeagueStats")}
        >
          <Card.Content style={style.cardContent}>
            <Text
              style={{
                textAlign: "center",
                color: "#fff",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Weekly Statistics
            </Text>
          </Card.Content>
        </Card>
      </View>

      <View style={style.cardHouse}>
        <Card
          elevation={1}
          style={{
            alignItems: "center",
            borderRadius: 0,
            backgroundColor: "#fff",
            flex: 1,
          }}
          onPress={() => navigation.navigate("MakePayment")}
        >
          <Card.Content style={style.cardContent}>
            <Text
              style={{
                textAlign: "center",
                color: "#000",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Make Payment
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
          onPress={() => navigation.navigate("CheckPayments")}
        >
          <Card.Content style={style.cardContent}>
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

      <View style={style.cardHouse}>
        <Card
          elevation={1}
          style={{
            alignItems: "center",
            borderRadius: 0,
            backgroundColor: "#fff",
            flex: 1,
          }}
        >
          <Card.Content style={style.cardContent}>
            <Text
              style={{
                textAlign: "center",
                color: "#000",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Game week rank List
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
          <Card.Content style={style.cardContent}>
            <Text
              style={{
                textAlign: "center",
                color: "#fff",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Month rank List
            </Text>
          </Card.Content>
        </Card>
      </View>

      <View style={style.cardHouse}>
        <Card
          elevation={1}
          style={{
            alignItems: "center",
            borderRadius: 0,
            backgroundColor: "#fff",
            flex: 1,
          }}
        >
          <Card.Content style={style.cardContent}>
            <Text
              style={{
                textAlign: "center",
                color: "#000",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Penalized List
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
          <Card.Content style={style.cardContent}>
            <Text
              style={{
                textAlign: "center",
                color: "#fff",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Show Notifications
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
              Send message
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
  cardHouse: {
    display: "flex",
    height: height * 0.1,
    flexDirection: "row",
    marginTop: 4,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
  },
});
