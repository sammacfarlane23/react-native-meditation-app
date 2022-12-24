import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";

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
          <TouchableOpacity className="py-2 px-4 mb-8 min-w-full bg-blue-200 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
            <Text
              className="text-lg text-center"
              onPress={() => {
                // Here we will save the entry to the database
                navigation.navigate("Home");
              }}
            >
              Submit Entry
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-2 px-4 min-w-full bg-blue-200 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
            <Text
              className="text-lg text-center"
              onPress={() => {
                // Here we will save the entry to the database
                navigation.navigate("Home");
              }}
            >
              Skip
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TimerScreen;
