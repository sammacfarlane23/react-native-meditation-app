import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";

import Button from "../Components/Button";

const TimerScreen = ({ navigation }) => {
  const [entryText, setEntryText] = useState(null);

  return (
    <View className="flex-1 items-center justify-between bg-gray-800 p-5">
      <View className="items-center">
        <Text className="text-white text-center my-8 text-lg">
          30 minutes completed! Well done!
        </Text>
        <Text className="text-white text-center my-8 text-lg">
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
              // Here we will save the entry to the database
              // @TODO: Add entry to context for now
              navigation.navigate("Home");
            }}
          >
            Submit Entry
          </Button>
          <Button
            onPress={() => {
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
