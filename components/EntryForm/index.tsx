import { View, Text, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { parseDate } from "../../utils";
import useEntries from "../../context/entryContext";
import dayjs from "dayjs";
import Duration from "../Duration";
import { useIsLightMode } from "../../hooks";
import Button from "../Button";
const colors = require("../../constants/colors");

// @TODO: Use this component in EditScreen
const EntryForm = ({ entry }) => {
  const { addEntry } = useEntries();
  const [entryText, setEntryText] = useState<string | undefined>("");
  const { date, duration, text, id } = entry || {};
  const [entryDate, setEntryDate] = useState<string>(date);

  const navigation = useNavigation();

  useEffect(() => {
    if (!date) {
      setEntryDate(dayjs().format("YYYY-MM-DD HH:mm:ss"));
    }

    setEntryText(text);
  }, []);

  return (
    <View className="items-center">
      {/* @TODO - Create a reusable form for here and EditScreen */}
      <Text className="text-raisin-black dark:text-white my-4 self-start text-4xl font-semibold">
        {parseDate(date)}{" "}
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
      />
      <View className="w-1/2 my-2">
        {/* @TODO - send them to a "Well done" screen */}
        {entryText && (
          <Button
            onPress={() => {
              addEntry({
                date,
                duration,
                id,
                text: entryText,
              });
              navigation.navigate("Home");
            }}
            className="bg-french-gray dark:bg-green"
          >
            Submit Entry
          </Button>
        )}
        <Button
          onPress={() => {
            addEntry({
              date,
              duration,
              id,
              text: "",
            });
            navigation.navigate("Home");
          }}
          className="mt-4 bg-french-gray"
        >
          Skip
        </Button>
      </View>
    </View>
  );
};

export default EntryForm;
