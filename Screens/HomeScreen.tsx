import { View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import dayjs from "dayjs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import useEntries from "../context/entryContext";
import Button from "../components/Button";
import { RootStackParamList } from "../App";
import EntryList from "../components/EntryList";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen = ({ navigation }: Props) => {
  const { entries, clearEntries } = useEntries();

  return (
    <View className="flex-1 items-center justify-center bg-black px-2 pt-14">
      <View className="w-1/3">
        <Button
          className="mb-4 rounded-3xl"
          onPress={() => {
            navigation.navigate("Timer");
          }}
        >
          Start{" "}
          <MaterialCommunityIcons name="meditation" size={24} color="black" />
        </Button>
      </View>

      {/* <Button
        className="max-w-1/2 mb-4"
        onPress={() => {
          clearEntries();
        }}
      >
        Clear all entries
      </Button> */}

      <EntryList
        entries={entries.sort((a, b) =>
          dayjs(a.date).isAfter(dayjs(b.date)) ? -1 : 1
        )}
      />
    </View>
  );
};

export default HomeScreen;
