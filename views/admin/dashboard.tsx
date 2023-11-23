import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  VirtualizedList,
} from "react-native";
import { Appbar, Card, Surface, useTheme } from "react-native-paper";
import { useFetch } from "../../customHooks/reactQuery/useFetch";
import { useContext, useEffect } from "react";
import AuthContext from "../../context/authcontext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { FontAwesome5 } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
type Props = {
  navigation: any;
};

const { width, height } = Dimensions.get("window");

const BOTTOM_APPBAR_HEIGHT = 60;

export default function AdminDashboard({ navigation }: Props) {
  const { bottom } = useSafeAreaInsets();
  const theme = useTheme();

  const authCTX = useContext(AuthContext);
  const { data, error, isError, isSuccess } = useFetch(
    "/auth/",
    "token-checker",
    authCTX.userDetails.token
  );
  useEffect(() => {
    if (isError) {
      authCTX.logout();
      navigation.navigate("Login");
    }
  }, [data, isSuccess, isError, error]);

  const imageDashboard = require("../../assets/dashborad/fplegypt.jpg");
  return (
    <>
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

        <ScrollView>
          <View style={style.surfaceHouse}>
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="#DDDDDD"
              style={style.touchSurface}
              onPress={() => navigation.navigate("MonthlyLeagueStats")}
            >
              <Surface style={style.surfaceCard} elevation={5} mode="elevated">
                <View style={style.surfaceView} accessibilityRole="button">
                  <Text>Monthly league</Text>
                  <FontAwesome5 name="user" size={24} color="black" />
                </View>
                <Text style={{ position: "absolute", bottom: 10, left: 10 }}>
                  100
                </Text>
              </Surface>
            </TouchableHighlight>

            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="#DDDDDD"
              style={style.touchSurface}
              onPress={() => navigation.navigate("LeagueStats")}
            >
              <Surface style={style.surfaceCard} elevation={5}>
                <View style={style.surfaceView}>
                  <Text>Weekly league</Text>
                  <FontAwesome5 name="user" size={24} color="black" />
                </View>
                <Text style={{ position: "absolute", bottom: 10, left: 10 }}>
                  100
                </Text>
              </Surface>
            </TouchableHighlight>
          </View>

          <View style={style.surfaceHouse}>
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="#DDDDDD"
              style={style.touchSurface}
              onPress={() => navigation.navigate("MakePayment")}
            >
              <Surface style={style.surfaceCard} elevation={5} mode="elevated">
                <View style={style.surfaceView} accessibilityRole="button">
                  <Text>Make payment</Text>
                  <FontAwesome5 name="user" size={24} color="black" />
                </View>
                <Text style={{ position: "absolute", bottom: 10, left: 10 }}>
                  100
                </Text>
              </Surface>
            </TouchableHighlight>

            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="#DDDDDD"
              style={style.touchSurface}
              onPress={() => navigation.navigate("CheckPayments")}
            >
              <Surface style={style.surfaceCard} elevation={5}>
                <View style={style.surfaceView}>
                  <Text>Check payments</Text>
                  <FontAwesome5 name="user" size={24} color="black" />
                </View>
                <Text style={{ position: "absolute", bottom: 10, left: 10 }}>
                  0
                </Text>
              </Surface>
            </TouchableHighlight>
          </View>

          <View style={style.surfaceHouse}>
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="#DDDDDD"
              style={style.touchSurface}
              onPress={() => navigation.navigate("MakePayment")}
            >
              <Surface style={style.surfaceCard} elevation={5} mode="elevated">
                <View style={style.surfaceView} accessibilityRole="button">
                  <Text>Set payment rate</Text>
                  <FontAwesome5 name="user" size={24} color="black" />
                </View>
                <Text style={{ position: "absolute", bottom: 10, left: 10 }}>
                  2
                </Text>
              </Surface>
            </TouchableHighlight>
          </View>

          <View style={{ ...style.surfaceHouse, marginBottom: 60 }}>
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="#DDDDDD"
              style={style.touchSurface}
              onPress={() => navigation.navigate("MakePayment")}
            >
              <Surface style={style.surfaceCard} elevation={5} mode="elevated">
                <View style={style.surfaceView} accessibilityRole="button">
                  <Text>Manage users</Text>
                  <FontAwesome5 name="user" size={24} color="black" />
                </View>
                <Text style={{ position: "absolute", bottom: 10, left: 10 }}>
                  2
                </Text>
              </Surface>
            </TouchableHighlight>

            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="#DDDDDD"
              style={style.touchSurface}
              onPress={() => navigation.navigate("MakePayment")}
            >
              <Surface style={style.surfaceCard} elevation={5} mode="elevated">
                <View style={style.surfaceView} accessibilityRole="button">
                  <Text>Manage admins</Text>
                  <FontAwesome5 name="user" size={24} color="black" />
                </View>
                <Text style={{ position: "absolute", bottom: 10, left: 10 }}>
                  2
                </Text>
              </Surface>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </View>
      <Appbar
        style={[
          style.bottom,
          {
            height: BOTTOM_APPBAR_HEIGHT + bottom,
            backgroundColor: theme.colors.elevation.level2,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          },
        ]}
        safeAreaInsets={{ bottom }}
      >
        <Appbar.Action icon="home" onPress={() => {}} />
        <Appbar.Action icon="email" onPress={() => {}} />
        <Appbar.Action icon="bell" onPress={() => {}} />
      </Appbar>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  surfaceHouse: {
    display: "flex",
    height: height * 0.17,
    flexDirection: "row",
    marginTop: 4,
    marginHorizontal: 4,
  },
  touchSurface: {
    flex: 1,
    height: height * 0.15,
    width: width * 0.4,
    borderRadius: 4,
    margin: 4,
  },
  surfaceCard: {
    backgroundColor: "white",
    padding: 8,
    flex: 1,
    height: height * 0.15,
    borderRadius: 4,
  },
  surfaceView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardHouse: {
    display: "flex",
    height: height * 0.1,
    flexDirection: "row",
    marginTop: 4,
    marginHorizontal: 4,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
  },
  fab: {
    position: "absolute",
    right: 16,
  },
  bottom: {
    backgroundColor: "aquamarine",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
});
