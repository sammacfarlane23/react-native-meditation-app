import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { View, Text, TextInput } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { parseDuration } from "../utils";
import Button from "../components/Button";
import useEntries from "../context/entryContext";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Edit">;

const EditScreen = ({ navigation, route }: Props) => {
  const { updateEntry, removeEntry } = useEntries();
  const [entryText, setEntryText] = useState<string | undefined>("");
  const { date, duration, text, id } = route.params.entry;

  useEffect(() => {
    setEntryText(text);
  }, []);

  return (
    <View className="flex-1 items-center justify-between bg-black p-5">
      <View className="items-center">
        <Text className="text-off-white text-center my-8 text-xl font-semibold">
          {parseDuration(duration)}
        </Text>
        <Text className="mb-2 text-2xl font-bold tracking-tight text-off-white">
          {dayjs(date).format("DD/MM/YYYY")}{" "}
        </Text>
        <Text className="text-off-white">{dayjs(date).format("HH:mm")}</Text>
        <TextInput
          className="w-96 my-8 p-2 border-2 text-black border-gray-300 bg-french-gray h-96 rounded-md"
          multiline={true}
          onChangeText={setEntryText}
          value={entryText}
          placeholder="How did this session make you feel?"
        />
        {/* @TODO - Carry on with themeing, look at tailwind.config.js */}
        <View className="w-1/2 my-2">
          <Button
            onPress={() => {
              updateEntry({
                ...route.params.entry,
                text: entryText,
              });
              navigation.navigate("Home");
            }}
            className="mt-4"
          >
            Finished
          </Button>
          <Button
            onPress={() => {
              navigation.navigate("Home");
            }}
            className="mt-4 bg-red-500"
          >
            Cancel
          </Button>
          <Button
            onPress={() => removeEntry(id)}
            className="bg-red-600 w-1/2 my-4"
          >
            Delete
          </Button>
        </View>
      </View>
    </View>
  );
};

export default EditScreen;
