import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { parseDate } from "../../utils";
import { Entry } from "../../context/entryContext";
import dayjs from "dayjs";
import Duration from "../Duration";
import { useIsLightMode } from "../../hooks";
import Button from "../Button";
const colors = require("../../constants/colors");

const EntryForm = ({
  entry,
  handleSubmit,
  handleRemove,
}: {
  entry: Entry;
  handleSubmit: (id: string, entry: Entry) => Promise<void>;
  handleRemove?: (id: string) => Promise<void>;
}) => {
  const [entryText, setEntryText] = useState<string | undefined>("");
  const { date, duration, text, _id } = entry || {};
  const [entryDate, setEntryDate] = useState<string>(date);

  const navigation = useNavigation();

  useEffect(() => {
    setEntryDate(date || dayjs().format("YYYY-MM-DD HH:mm:ss"));

    setEntryText(text);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className="items-center">
        <Text className="text-raisin-black dark:text-white my-4 self-start text-4xl font-semibold">
          {parseDate(entryDate)}{" "}
        </Text>
        <Duration
          className="text-raisin-black dark:text-off-white"
          iconColor={
            useIsLightMode() ? colors["raisin-black"] : colors["off-white"]
          }
          duration={duration}
        />
        <TextInput
          className="w-96 my-8 px-3 py-3 text-off-white dark:text-raisin-black bg-taupe-gray dark:bg-french-gray h-48 rounded-md"
          multiline={true}
          onChangeText={setEntryText}
          value={entryText}
          placeholderTextColor={useIsLightMode() ? "white" : "black"}
          placeholder="How did this session make you feel?"
          onBlur={() => Keyboard.dismiss()}
        />
        <View className="w-1/2 my-2">
          {entryText && (
            <Button
              onPress={() => {
                handleSubmit(_id, {
                  text: entryText,
                });
                navigation.navigate("Home", { celebrate: true });
              }}
              className="bg-french-gray dark:bg-green"
            >
              Save
            </Button>
          )}
          {!handleRemove && (
            <Button
              onPress={() => {
                handleSubmit(_id, {
                  text: "",
                });
                navigation.navigate("Home", { celebrate: true });
              }}
              className="mt-4 bg-french-gray"
            >
              Skip journaling
            </Button>
          )}
          {handleRemove && (
            <Button
              onPress={() => {
                handleRemove(_id);
                navigation.navigate("Home");
              }}
              className="bg-red-600 w-1/2 my-4 bg-red"
            >
              Delete
            </Button>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EntryForm;
