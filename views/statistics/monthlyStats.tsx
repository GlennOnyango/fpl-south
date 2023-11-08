import { useEffect, useMemo, useState } from "react";
import { StyleSheet, StatusBar, ScrollView } from "react-native";
import { useFetchFPL } from "../../customHooks/useFetchFpl";
import { List, Text } from "react-native-paper";
import { useGetDamage } from "../../customHooks/getMonthlyCost";

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
  const [data, callApi, isLoading, errorData] = useFetchFPL();
  const [dataBootstrap, callApiBootstrap, isLoadingBootstrap, errorDataBoot] =
    useFetchFPL();
  const [dataCost, callApiCost, isLoadingCost, errorCost] = useGetDamage();
  const date = new Date();
  const currentMonth = date.getMonth();

  const months = [6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5];

  const standings = useMemo(() => {
    if (typeof data === "object") {
      if ("fetch" in data) {
        callApi(
          `leagues-classic/264658/standings/?page_new_entries=1&page_standings=1&phase=${
            months[currentMonth] + 1
          }`
        );
      }
    } else {
      //convert string to object
      const dataObject = JSON.parse(data);
      return dataObject["standings"]["results"];
    }
    return [];
  }, [data]);

  const leagueWeeks = useMemo(() => {
    if (standings.length > 0) {
      if (typeof dataBootstrap === "object") {
        if ("fetch" in dataBootstrap) {
          callApiBootstrap("bootstrap-static/");
        }
      } else {
        //convert string to object
        let eventCurrent: number[] = [];

        const dataObject = JSON.parse(dataBootstrap);
        const events = dataObject["events"];
        events.forEach((event: any) => {
          const eventDate = new Date(event["deadline_time"]);
          const eventMonth = eventDate.getMonth();
          if (eventMonth === currentMonth) {
            eventCurrent.push(event["id"]);
          }
        });

        return eventCurrent;
      }
    }

    return [];
  }, [dataBootstrap, standings]);

  const dataCostSorted = useMemo(() => {
    if (dataCost.length === 0) {
      standings.forEach((entry: any) => {
        const entryId = entry["entry"];
        callApiCost(leagueWeeks, entryId);
      });
    } else if (dataCost.length > 0) {
      const dataCombined = dataCost.map((e: any) => {
        const entry = e.id;
        const cost = e.cost;
        const index = standings.findIndex((e: any) => e.entry === entry);
        const entry_name = standings[index].entry_name;
        const event_total = standings[index].event_total;
        const player_name = standings[index].player_name;
        return {
          id: entry,
          event_total: event_total - cost,
          player_name: player_name,
          total: standings[index].total,
          entry: entry,
          entry_name: entry_name,
          cost: cost,
        };
      });

      return dataCombined.sort((a: any, b: any) => {
        return b["event_total"] - a["event_total"];
      });
    }
    return [];
  }, [standings, leagueWeeks, dataCost]);

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

  return (
    <List.Section
      title={`Game Weeks ${leagueWeeks}`}
      style={{ paddingBottom: 30 }}
    >
      <ScrollView>
        {dataCostSorted.map((e: ItemPropsCost, index: number) => {
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
