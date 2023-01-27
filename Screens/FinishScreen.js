import { useState } from "react";
import dayjs from "dayjs";
import { View, Text, TextInput } from "react-native";

import Button from "../Components/Button";
import { useEntryContext } from "../context/entryContext";

const TimerScreen = ({ navigation, route }) => {
  const [entryText, setEntryText] = useState(null);
  const entryContext = useEntryContext();

  return (
    <View className="flex-1 items-center justify-between bg-gray-800 p-5">
      <View className="items-center">
        <Text className="text-white text-center my-8 text-xl font-bold">
          {route.params.duration} minutes completed! Well done!
        </Text>
        <Text className="text-white text-center my-8 text-xl font-bold">
          Now is your chance to journal the experience...
        </Text>
        <TextInput
          className="w-96 my-8 p-4 border-2 text-black border-gray-300 bg-white h-96 rounded-md"
          multiline={true}
          onChangeText={setEntryText}
          value={entryText}
          placeholder="How did this session make you feel?"
        />
        <View className="w-1/2 my-8">
          <Button
            onPress={() => {
              entryContext.addEntry({
                date: dayjs(),
                duration: route.params.duration,
                text: entryText,
              });
              navigation.navigate("Home");
            }}
          >
            Submit Entry
          </Button>
          <Button
            onPress={() => {
              entryContext.addEntry({
                date: dayjs(),
                duration: route.params.duration,
                text: "",
              });
              navigation.navigate("Home");
            }}
            className="mt-8"
          >
            Skip
          </Button>
        </View>
      </View>
    </View>
  );
};

export default TimerScreen;
