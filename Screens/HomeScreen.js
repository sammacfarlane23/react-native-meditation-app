import { useContext } from "react";
import { View } from "react-native";
import { EntryContext } from "../context/entryContext";

import Button from "../Components/Button";
import EntryCard from "../Components/EntryCard";

const HomeScreen = ({ navigation }) => {
  const { entries } = useContext(EntryContext);

  return (
    <View className="flex-1 items-center justify-center bg-gray-800 p-5">
      <Button
        className="max-w-1/2"
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
