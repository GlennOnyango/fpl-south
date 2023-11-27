import { useContext, useEffect } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Appbar,
  List,
  Text,
  useTheme,
} from "react-native-paper";
import { useFetch } from "../../customHooks/reactQuery/useFetch";
import AuthContext from "../../context/authcontext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
type Props = {
  navigation: any;
};

type ItemPropsCost = {
  id: number;
  event_total: number;
  player_name: string;
  total: number;
  entry: number;
  entry_name: string;
  cost: number;
};

interface League extends ItemPropsCost {
  index: number;
}

const { width, height } = Dimensions.get("window");
const BOTTOM_APPBAR_HEIGHT = 60;

export default function LeagueStats({ navigation }: Props) {
  const { bottom } = useSafeAreaInsets();
  const theme = useTheme();
  const authCTX = useContext(AuthContext);
  //update screen name
  useEffect(() => {
    navigation.setOptions({
      title: "weekly statistics",
    });
  }, []);
  const { data, isError, isFetching, isLoading } = useFetch(
    "/rank/weekly",
    "weekly-rank",
    authCTX.userDetails.token
  );

  const Item = ({
    event_total,
    player_name,
    entry,
    cost,
    entry_name,
    index,
  }: League) => (
    <List.Accordion
      title={entry_name}
      key={entry}
      style={{
        paddingHorizontal: 20,
      }}
      left={(props) => {
        if (index === 0) {
          return <List.Icon {...props} icon="crown" color="gold" />;
        }

        if (index === 1) {
          return <List.Icon {...props} icon="medal" color="silver" />;
        }

        return null;
      }}
    >
      <List.Item
        title={`Points: ${event_total}`}
        style={{
          paddingHorizontal: 20,
        }}
      />
      <List.Item
        title={`Player name: ${player_name}`}
        style={{
          paddingHorizontal: 20,
        }}
      />

      <List.Item
        title={`Points deducted: ${cost}`}
        style={{
          paddingHorizontal: 20,
        }}
      />
    </List.Accordion>
  );

  if (isLoading || isFetching) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator
          animating={true}
          size={"large"}
          color={theme.colors.secondary}
        />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>
          An error occured.Screenshot and send the error to the admin.
        </Text>
      </View>
    );
  }

  return (
    <>
      <List.Section
        title={`Game weeek ${data.event}`}
        style={{ paddingBottom: 30 }}
      >
        <ScrollView>
          {data.data.map((e: ItemPropsCost, index: number) => {
            const eprime = { ...e, index: index };
            return <Item key={e.entry} {...eprime} />;
          })}
        </ScrollView>
      </List.Section>

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
        <Appbar.Action
          icon="home"
          onPress={() => navigation.navigate("AdminDashboard")}
        />
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
