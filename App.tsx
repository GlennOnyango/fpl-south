import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import {
  MD3DarkTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import CustomNavigationBar from "./customNavigtionBar";
import CreateAccount from "./views/createAccount";
import Login from "./views/login";
import Dashboard from "./views/dashboard";
import MakePayment from "./views/payments/makePayment";
import { PaymentContextProvider } from "./context/payment";
import { AuthContextProvider } from "./context/authcontext";
import { QueryClient, QueryClientProvider } from "react-query";
import CheckPayment from "./views/payments/checkPayments";
import LeagueStats from "./views/statistics/leagueStats";
import MonthlyLeagueStats from "./views/statistics/monthlyStats";

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#000",
    accent: "#000",
    background: "#fff",
    surface: "#fff",
    placeholder: "#000",
    backdrop: "#000",
    onSurface: "#000",
    notification: "#000",
    secondary: "#1a237e",
  },
};

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <PaymentContextProvider>
          <PaperProvider theme={theme}>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName="CreateAccount"
                screenOptions={{
                  header: (props: any) => <CustomNavigationBar {...props} />,
                }}
              >
                <Stack.Screen name="CreateAccount" component={CreateAccount} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Dashboard" component={Dashboard} />
                <Stack.Screen name="MakePayment" component={MakePayment} />
                <Stack.Screen name="CheckPayments" component={CheckPayment} />
                <Stack.Screen name="LeagueStats" component={LeagueStats} />
                <Stack.Screen
                  name="MonthlyLeagueStats"
                  component={MonthlyLeagueStats}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </PaperProvider>
        </PaymentContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
