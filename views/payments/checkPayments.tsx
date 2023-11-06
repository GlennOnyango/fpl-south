import { useState } from "react";
import { StyleSheet, StatusBar, ScrollView } from "react-native";
import { List } from "react-native-paper";

type Props = {
  navigation: any;
};

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    amount: 100,
    date: "2021-05-10",
    status: "approved",
    code: "123456789",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    amount: 310,
    date: "2021-06-10",
    status: "pending",
    code: "ADASQ789",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    amount: 400,
    date: "2021-05-18",
    status: "Rejected",
    code: "XQR12TJH",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    amount: 100,
    date: "2021-05-10",
    status: "approved",
    code: "123456789",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    amount: 310,
    date: "2021-06-10",
    status: "pending",
    code: "ADASQ789",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    amount: 400,
    date: "2021-05-18",
    status: "Rejected",
    code: "XQR12TJH",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    amount: 100,
    date: "2021-05-10",
    status: "approved",
    code: "123456789",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    amount: 310,
    date: "2021-06-10",
    status: "pending",
    code: "ADASQ789",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    amount: 400,
    date: "2021-05-18",
    status: "Rejected",
    code: "XQR12TJH",
  },
];

type ItemProps = {
  id: string;
  amount: number;
  date: string;
  status: string;
  code: string;
};

const Item = ({ id, amount, date, code, status }: ItemProps) => (
  <List.Accordion
    title={date}
    left={(props) => <List.Icon {...props} icon="artstation" />}
  >
    <List.Item
      title={amount}
      left={(props) => (
        <List.Icon {...props} icon="currency-gbp" color="black" />
      )}
      style={{
        paddingHorizontal: 20,
      }}
    />
    <List.Item
      title={code}
      left={(props) => <List.Icon {...props} icon="database" color="black" />}
      style={{
        paddingHorizontal: 20,
      }}
    />
    <List.Item
      title={status}
      left={(props) => (
        <List.Icon {...props} icon="shield-check" color="black" />
      )}
      style={{
        paddingHorizontal: 20,
      }}
    />
  </List.Accordion>
);

export default function CheckPayment({ navigation }: Props) {
  const [expanded, setExpanded] = useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Section title="Recent payments">
      <ScrollView>
        {DATA.map((e: any) => {
          return <Item key={e.id} {...e} />;
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
