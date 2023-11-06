import { Appbar, useTheme } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";

import { StatusBar } from "expo-status-bar";
type Props = {
  route: any;
  options: any;
  back: any;
  navigation: any;
};

export default function CustomNavigationBar({
  route,
  options,
  navigation,
  back,
}: Props) {
  const theme = useTheme();
  const title = getHeaderTitle(options, route.name);
  const titleBack = ["Dashboard", "Login", "CreateAccount"];

  const backAct = back ? (
    <Appbar.BackAction onPress={navigation.goBack} />
  ) : null;

  return (
    <>
      <Appbar.Header mode="small">
        {titleBack.includes(title) ? null : backAct}
        <Appbar.Content title={title} color={theme.colors.secondary} />
      </Appbar.Header>

      <StatusBar style="dark" animated />
    </>
  );
}
