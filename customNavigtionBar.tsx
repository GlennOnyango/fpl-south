import { Appbar, useTheme } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";

import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import AuthContext from "./context/authcontext";
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
  const authCTX = useContext(AuthContext);
  const theme = useTheme();
  const title = getHeaderTitle(options, route.name);
  const titleBack = ["Dashboard", "Login", "CreateAccount"];

  const _logout = () => {
    authCTX.logout();
    navigation.navigate("Login");
  }

  const backAct = back ? (
    <Appbar.BackAction onPress={navigation.goBack} />
  ) : null;

  if (title === "AdminDashboard") {
    return (
      <>
        <Appbar.Header mode="small">
          <Appbar.Content
            title={"Admin dashboard"}
            color={"black"}
          />
          <Appbar.Action icon="logout" color="black" onPress={_logout} />
        </Appbar.Header>

        <StatusBar style="dark" animated />
      </>
    );
  }

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
