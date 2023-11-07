import { useEffect, useMemo, useState } from "react";
import { StyleSheet, StatusBar, ScrollView } from "react-native";
import { useFetchFPL } from "../../customHooks/useFetchFpl";
import { List, Text } from "react-native-paper";

type Props = {
  navigation: any;
};

type ItemProps = {
  id: number;
  event_total: number;
  player_name: string;
  rank: number;
  last_rank: number;
  rank_sort: number;
  total: number;
  entry: number;
  entry_name: string;
};

interface League extends ItemProps {
  index: number;
}

export default function MonthlyLeagueStats({ navigation }: Props) {
  const [data, callApi, isLoading] = useFetchFPL();
  const [standings, setStandings] = useState<any>([]);
  const [league, setLeague] = useState<any>({});
  const date = new Date();
  const currentMonth = date.getMonth() + 1;
  useEffect(() => {
    //check if data is object or string

    if (typeof data === "object") {
      if ("fetch" in data) {
        callApi("/standings/?page_new_entries=1&page_standings=1&phase=5");
      }
    } else {
      //convert string to object
      const dataObject = JSON.parse(data);
      setStandings(dataObject["standings"]["results"]);
      setLeague(dataObject["league"]);
    }
  }, [data]);

  const orderStandings = useMemo(() => {
    if (standings.length > 0) {
      return standings.sort((a: any, b: any) => {
        return b["event_total"] - a["event_total"];
      });
    }
    return [];
  }, [standings]);

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

  return (
    <List.Section title={league.name} style={{ paddingBottom: 30 }}>
      <ScrollView>
        {orderStandings.map((e: ItemProps, index: number) => {
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
