import { View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import useEntries from "../context/entryContext";
import Button from "../components/Button";
import { RootStackParamList } from "../App";
import EntryList from "../components/EntryList";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen = ({ navigation }: Props) => {
  const { entries, clearEntries } = useEntries();

  return (
    <View className="flex-1 items-center justify-center bg-gray-800 p-5 pt-20">
      <Button
        className="max-w-1/2 mb-4"
        onPress={() => {
          navigation.navigate("Timer");
        }}
      >
        Begin meditation
      </Button>

      <Button
        className="max-w-1/2 mb-4"
        onPress={() => {
          clearEntries();
        }}
      >
        Clear all entries
      </Button>

      <EntryList entries={entries} />
    </View>
  );
};

export default HomeScreen;
