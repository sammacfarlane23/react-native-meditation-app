import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeWindStyleSheet, useColorScheme } from "nativewind";

import HomeScreen from "./Screens/HomeScreen";
import TimerScreen from "./Screens/TimerScreen";
import FinishScreen from "./Screens/FinishScreen";
import { Entry, EntryContextProvider } from "./context/entryContext";
import EditScreen from "./Screens/EditScreen";
import Header from "./components/Header";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export type RootStackParamList = {
  Home: undefined;
  Timer: undefined;
  Finish: { duration: number };
  Edit: { entry: Entry };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const { colorScheme } = useColorScheme();

  return (
    // <EntryContextProvider>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colorScheme === "light" ? "#E8EBE4" : "#030712",
          },
          headerTintColor: "#E7ECEF",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
          headerTitle: (props) => <Header {...props} />,
          headerBackVisible: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Timer" component={TimerScreen} />
        <Stack.Screen name="Finish" component={FinishScreen} />
        <Stack.Screen name="Edit" component={EditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    // </EntryContextProvider>
  );
}

export default App;
