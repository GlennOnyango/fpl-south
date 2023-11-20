import { StyleSheet, StatusBar, ScrollView, View } from "react-native";

import { ActivityIndicator, List, Text, useTheme } from "react-native-paper";
import { useFetch } from "../../customHooks/reactQuery/useFetch";
import { useContext } from "react";
import AuthContext from "../../context/authcontext";

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

export default function MonthlyLeagueStats({ navigation }: Props) {
  const authCTX = useContext(AuthContext);
  const theme = useTheme();
  const { data, isError, isFetching, isLoading } = useFetch(
    "/rank/monthly",
    "monthly-rank",
    authCTX.userDetails.token
  );

  const Item = ({
    event_total,
    player_name,
    entry,
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

        if (index === 2) {
          return <List.Icon {...props} icon="medal" color="brown" />;
        }

        return null;
      }}
    >
      <List.Item
        title={event_total}
        left={(props) => (
          <List.Icon {...props} icon="currency-gbp" color="black" />
        )}
        style={{
          paddingHorizontal: 20,
        }}
      />
      <List.Item
        title={player_name}
        left={(props) => <List.Icon {...props} icon="database" color="black" />}
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
    <List.Section title={`Game Weeks `} style={{ paddingBottom: 30 }}>
      <ScrollView>
        {data.data.map((e: ItemPropsCost, index: number) => {
          const eprime = { ...e, index: index };
          return <Item key={e.entry} {...eprime} />;
        })}
      </ScrollView>
    </List.Section>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 2,
    marginVertical: 2,
    marginHorizontal: 2,
  },
  title: {
    fontSize: 24,
  },
});
