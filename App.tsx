import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./Screens/HomeScreen";
import TimerScreen from "./Screens/TimerScreen";
import FinishScreen from "./Screens/FinishScreen";
import { Entry, EntryContextProvider } from "./context/entryContext";
import EditScreen from "./Screens/EditScreen";

export type RootStackParamList = {
  Home: undefined;
  Timer: undefined;
  Finish: { duration: number };
  Edit: {entry: Entry};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <EntryContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "black",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "Welcome to the meditation app",
            }}
          />
          <Stack.Screen name="Timer" component={TimerScreen} />
          <Stack.Screen name="Finish" component={FinishScreen} />
          <Stack.Screen name="Edit" component={EditScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </EntryContextProvider>
  );
}

export default App;
