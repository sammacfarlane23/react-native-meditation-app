import { View, Text, TouchableOpacity } from "react-native";

import Button from "../Components/Button";
import Card from "../Components/Card";

const meditationEntries = [
  {
    date: "2021-08-01",
    duration: 10,
    rating: 5,
    text: "I felt great after this meditation",
  },
  {
    date: "2021-08-04",
    duration: 10,
    rating: 5,
    text: "This meditation was a bit hit or miss but we move. Let's make this a long text to see how it looks",
    type: "unguided",
  },
];

const HomeScreen = ({ navigation }) => {
  return (
    <View className="flex-1 items-center justify-center bg-gray-800 p-5">
      <Button
        className="max-w-1/2"
        onPress={() => navigation.navigate("Timer")}
      >
        Begin meditation
      </Button>

      {meditationEntries.map((entry) => (
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