import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { View, Text, TextInput } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { parseDate } from "../utils";
import Duration from "../components/Duration";
import Button from "../components/Button";
import useEntries from "../context/entryContext";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Finish">;

const TimerScreen = ({ navigation, route }: Props) => {
  const { addEntry } = useEntries();
  const [entryText, setEntryText] = useState<string>("");
  const [date, setDate] = useState<string>("");
  // @TODO - use a better id generator
  const id =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  useEffect(() => {
    setDate(dayjs().format("YYYY-MM-DD HH:mm:ss"));
  }, []);

  return (
    <View className="flex-1 items-center justify-between bg-black p-5">
      <View className="items-center">
        <Text className="text-white my-4 self-start text-4xl font-semibold">
          {parseDate(date)}{" "}
        </Text>
        <Duration duration={route.params.duration} />
        <TextInput
          className="w-96 my-8 px-3 py-3 text-black bg-gray-300 h-48 rounded-md"
          multiline={true}
          onChangeText={setEntryText}
          value={entryText}
          placeholder="How did this session make you feel?"
        />
        <View className="w-1/2 my-2">
          {/* @TODO - send them to a "Well done" screen */}
          {entryText && <Button
            onPress={() => {
              addEntry({
                date,
                duration: route.params.duration,
                id,
                text: entryText,
              });
              navigation.navigate("Home");
            }}
          >
            Submit Entry
          </Button>}
          <Button
            onPress={() => {
              addEntry({
                date,
                duration: route.params.duration,
                id,
                text: "",
              });
              navigation.navigate("Home");
            }}
            className="mt-4"
          >
            Skip
          </Button>
        </View>
      </View>
    </View>
  );
};

export default TimerScreen;
