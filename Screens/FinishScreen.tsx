import { useState } from "react";
import dayjs from "dayjs";
import { View, Text, TextInput } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { parseDuration } from "../utils";
import Button from "../components/Button";
import useEntries from "../context/entryContext";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Finish">;

const TimerScreen = ({ navigation, route }: Props) => {
  const { addEntry } = useEntries();
  const [entryText, setEntryText] = useState<string>("");
  const date = dayjs().format("YYYY-MM-DD HH:mm:ss");
  // @TODO - use a better id generator
  const id =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  return (
    <View className="flex-1 items-center justify-between bg-gray-800 p-5">
      <View className="items-center">
        <Text className="text-white text-center my-8 text-xl font-semibold">
          {parseDuration(route.params.duration)} completed! Well done!
        </Text>
        <Text className="text-white text-center my-8 text-xl font-semibold">
          Now is your chance to journal the experience...
        </Text>
        <TextInput
          className="w-96 my-8 p-2 border-2 text-black border-gray-300 bg-white h-96 rounded-md"
          multiline={true}
          onChangeText={setEntryText}
          value={entryText}
          placeholder="How did this session make you feel?"
        />
        <View className="w-1/2 my-2">
          <Button
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
          </Button>
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
