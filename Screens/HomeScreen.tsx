import { useContext } from "react";
import { View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { EntryContext } from "../context/entryContext";
import Button from "../components/Button";
import EntryCard from "../components/EntryCard";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => {
  const { entries } = useContext(EntryContext);

  return (
    <View className="flex-1 items-center justify-center bg-gray-800 p-5">
      <Button
        className="max-w-1/2 mb-4"
        onPress={() => navigation.navigate("Timer")}
      >
        Begin meditation
      </Button>

      {entries.map(({ text, date, duration }) => (
        <EntryCard key={text} {...{ text, date, duration }} />
      ))}
    </View>
  );
};

export default HomeScreen;
