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
    <View className="flex-1 h-full items-center justify-start bg-black px-2 pt-8">
      <EntryList
        entries={entries.sort((a, b) =>
          dayjs(a.date).isAfter(dayjs(b.date)) ? -1 : 1
        )}
      />
      <View className="absolute bottom-16" style={{width: 160}}>
        <Button
          className="rounded-full w-full h-full flex items-center justify-center py-3 bg-red"
          textClassName="text-3xl"
          onPress={() => {
            navigation.navigate("Timer");
          }}
        >
          Start{" "}
          <MaterialCommunityIcons name="meditation" size={32} color="black" />
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
    </View>
  );
};

export default HomeScreen;
