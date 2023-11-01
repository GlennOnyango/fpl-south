import { Appbar, useTheme } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";

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
  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} color={theme.colors.secondary} />
    </Appbar.Header>
  );
}
