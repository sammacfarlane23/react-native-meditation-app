import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeWindStyleSheet } from "nativewind";

import HomeScreen from "./Screens/HomeScreen";
import TimerScreen from "./Screens/TimerScreen";
import FinishScreen from "./Screens/FinishScreen";
import { Entry, EntryContextProvider } from "./context/entryContext";
import EditScreen from "./Screens/EditScreen";
import { Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

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

const HeaderTitle = () => {
  return (
    <View className="flex flex-row justify-between w-full pr-8">
      <Feather name="arrow-left" size={24} color="white" />
      <Feather name="menu" size={24} color="white" />
    </View>
  );
};

function App() {
  return (
    <EntryContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#030712",
            },
            headerTintColor: "#E7ECEF",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerTitle: (props) => <HeaderTitle {...props} /> }}
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
