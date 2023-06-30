import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { View, Text, TextInput } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { parseDate } from "../utils";
import Duration from "../components/Duration";
import Button from "../components/Button";
import useEntries from "../context/entryContext";
import { RootStackParamList } from "../App";
import { useIsLightMode } from "../hooks";
import EntryForm from "../components/EntryForm";

type Props = NativeStackScreenProps<RootStackParamList, "Finish">;

const TimerScreen = ({ navigation, route }: Props) => {
  // @TODO - use a better id generator
  const id =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  return (
    <View className="flex-1 items-center justify-between bg-alabaster dark:bg-black p-5">
      <EntryForm entry={{ duration: route.params.duration, id }} />
    </View>
  );
};

export default TimerScreen;
