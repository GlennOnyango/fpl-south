import { useMemo } from "react";
import { ScrollView, View } from "react-native";
import { useFetchFPL } from "../../customHooks/useFetchFpl";
import {
  ActivityIndicator,
  List,
  MD2Colors,
  Text,
  useTheme,
} from "react-native-paper";
import { useGetDamage } from "../../customHooks/getDamage";

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

export default function LeagueStats({ navigation }: Props) {
  const theme = useTheme();
  const [data, callApi, isLoading, errorData] = useFetchFPL();
  const [dataBootstrap, callApiBootstrap, isLoadingBootstrap, errorDataBoot] =
    useFetchFPL();
  const [dataCost, callApiCost, isLoadingCost, errorCost] = useGetDamage();

  const standings = useMemo(() => {
    if (typeof data === "object") {
      if ("fetch" in data) {
        callApi("leagues-classic/264658/standings/");
      }
    } else {
      //convert string to object
      const dataObject = JSON.parse(data);
      return dataObject["standings"]["results"];
    }
    return [];
  }, [data]);

  const eventCurrent = useMemo(() => {
    let eventCurrent = 0;
    if (typeof dataBootstrap === "object") {
      if ("fetch" in dataBootstrap) {
        callApiBootstrap("bootstrap-static/");
      }
      eventCurrent = 0;
    } else {
      //convert string to object
      const dataObject = JSON.parse(dataBootstrap);
      const events = dataObject["events"];
      events.forEach((event: any) => {
        if (event["is_current"]) {
          eventCurrent = event["id"];
        }
      });
    }
    return eventCurrent;
  }, [dataBootstrap]);

  const dataCostSorted = useMemo(() => {
    if (dataCost.length === 0) {
      if (standings.length > 0 && eventCurrent !== 0) {
        const userList = standings.map((e: any) => e.entry);
        callApiCost(eventCurrent, userList);
      }
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
  }, [dataCost, standings, eventCurrent]);

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

  if (isLoading || isLoadingBootstrap || isLoadingCost) {
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

  if (errorData || errorDataBoot || errorCost) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>
          An error occured.Screenshot and send the error to the admin.
        </Text>
      </View>
    );
  }

  return (
    <List.Section
      title={`Game weeek ${eventCurrent}`}
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
