import { useState, useEffect } from "react";
import { View, Text, TextInput } from "react-native";

import Button from "../Components/Button";

const TimerScreen = ({ navigation }) => {
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timer, setTimer] = useState(60 * 30);
  const [number, onChangeNumber] = useState(null);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  useEffect(() => {
    if (isTimerActive) {
      const interval = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  });

  return (
    <View className="flex-1 items-center justify-center bg-gray-800 p-5">
      <View className="pb-10">
        <Text className="text-5xl text-white">{`${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}</Text>
      </View>

      {!isTimerActive && (
        <View className="w-1/2 flex-row justify-center items-center">
          <TextInput
            className="w-1/3 px-2 border-2 text-black mb-6 border-gray-300 bg-white h-10 rounded-lg"
            onChangeText={onChangeNumber}
            value={number}
            keyboardType="numeric"
          />
          <Text className="text-white ml-2">minutes</Text>
        </View>
      )}

      <View className="w-1/2">
        <Button
          className="mb-6"
          onPress={() => setIsTimerActive(!isTimerActive)}
        >
          {isTimerActive ? "Pause" : "Start"}
        </Button>

        <Button
          onPress={() => {
            setTimer(60 * 30);
            setIsTimerActive(false);
          }}
        >
          Reset
        </Button>

        <Button className="mt-20" onPress={() => navigation.navigate("Finish")}>
          Finish Screen
        </Button>
      </View>
    </View>
  );
};

export default TimerScreen;
