import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import {
  Button,
  MD3DarkTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import CustomNavigationBar from "./customNavigtionBar";
import CreateAccount from './views/createAccount';
import Login from './views/login';
import Dashboard from './views/dashboard';
import MakePayment from './views/payments/makePayment';

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#000",
    accent: "#000",
    background: "#fff",
    surface: "#fff",
    text: "#000",
    disabled: "#000",
    placeholder: "#000",
    backdrop: "#000",
    onSurface: "#000",
    notification: "#000",
    secondary: "#1a237e",
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="CreateAccount"
          screenOptions={{
            header: (props: any) => <CustomNavigationBar {...props} />,
          }}
        >
          <Stack.Screen name='CreateAccount' component={CreateAccount} />
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Dashboard' component={Dashboard} />
          <Stack.Screen name='MakePayment' component={MakePayment} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
