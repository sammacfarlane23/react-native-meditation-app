import { View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import dayjs from "dayjs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import useEntries from "../context/entryContext";
import Button from "../components/Button";
import { RootStackParamList } from "../App";
import EntryList from "../components/EntryList";
import { useIsLightMode } from "../hooks";
import Celebration from "../components/Celebration";
import Confetti from "../components/Confetti";
import { useEffect, useState } from "react";
import useEntryStore from "../stores/entryStore";
const colors = require("../constants/colors");

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen = ({ navigation, route }: Props) => {
  const [showCelebration, setShowCelebration] = useState<boolean>(true);
  // const { entries, addEntry } = useEntries();
  const entries = useEntryStore((state) => state.entries);
  const getAllEntries = useEntryStore((state) => state.getAllEntries);
  const addEntry = useEntryStore((state) => state.addEntry);

  const isLightMode = useIsLightMode();

  const sortedEntries = entries?.sort((a, b) =>
    dayjs(a.date).isAfter(dayjs(b.date)) ? -1 : 1
  );

  const { celebrate } = route.params || { celebrate: false };

  useEffect(() => {
    getAllEntries();
    // @TODO: Get the trigger for this working
    // if (celebrate) {
    //   setShowCelebration(true);
    // }
  }, []);

  return (
    <View className="flex-1 h-full items-center bg-alabaster dark:bg-dark-gray justify-start px-2 pt-8">
      <Button
        onPress={() => {
          addEntry({
            date: dayjs().toISOString(),
            duration: 0,
            id: "test",
            text: "test",
          });
        }}
      >
        Add
      </Button>
      {/* {showCelebration && <Celebration />} */}
      <EntryList entries={sortedEntries} />
      <View className="absolute bottom-16" style={{ width: 160 }}>
        <Button
          className="rounded-full w-full h-full flex items-center justify-center py-3 bg-myrtle-green dark:bg-red"
          textClassName="text-3xl text-alabaster dark:text-black"
          onPress={() => {
            navigation.navigate("Timer");
          }}
        >
          Start{" "}
          <MaterialCommunityIcons
            name="meditation"
            size={32}
            color={isLightMode ? colors.alabaster : "black"}
          />
        </Button>
      </View>
    </View>
  );
};

export default HomeScreen;
