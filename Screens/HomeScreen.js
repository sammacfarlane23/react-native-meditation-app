import { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { EntryContext } from "../context/entryContext";

import Button from "../Components/Button";
import Card from "../Components/Card";

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

      {entries.map((entry) => (
        <Card
          key={entry.text}
          title={entry.date}
          text={entry.text}
          duration={entry.duration}
          type={entry?.type}
        />
      ))}
    </View>
  );
};

export default HomeScreen;
