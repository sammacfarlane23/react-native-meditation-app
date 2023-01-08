import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

import Button from "../Components/Button";

const TimerScreen = ({ navigation }) => {
  const [timerHasBegan, setTimerHasBegan] = useState(false);
  const [timerIsRunning, setTimerIsRunning] = useState(false);
  const [timer, setTimer] = useState(60 * 30);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  useEffect(() => {
    if (timerIsRunning) {
      const interval = setInterval(() => {
        if (timer <= 0) {
          navigation.navigate("Finish");
          setTimer(60 * 30);
          return;
        }
        setTimer((timer) => timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
    if (timer === 0) {
    }
  }, [timerIsRunning, timer]);

  return (
    <View className="flex-1 items-center justify-center bg-gray-800 p-5">
      {timerHasBegan && (
        <View className="pb-10">
          <Text className="text-5xl text-white">{`${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}</Text>
          {timerHasBegan && !timerIsRunning && (
            <Text className="text-white text-lg text-center mt-4">Paused</Text>
          )}
        </View>
      )}

      {!timerHasBegan && (
        <View className="items-center mb-4">
          <Text className="text-white text-xl">Select duration:</Text>
          <View className="flex-row items-center">
            <Picker
              selectedValue={timer / 60}
              onValueChange={(itemValue, itemIndex) => setTimer(itemValue * 60)}
              style={{
                height: 200,
                width: 100,
                backgroundColor: "rgb(31 41 55)",
              }}
              itemStyle={{ color: "white" }}
            >
              {[...Array(60).keys()].map((i) => (
                <Picker.Item key={i} label={(i + 1).toString()} value={i + 1} />
              ))}
            </Picker>
            <Text className="text-2xl text-white">Minutes</Text>
          </View>
        </View>
      )}

      <View className="w-1/2">
        <Button
          className="mb-6"
          onPress={() => {
            if (!timerHasBegan) setTimerHasBegan(true);
            setTimerIsRunning(!timerIsRunning);
          }}
        >
          {timerIsRunning ? "Pause" : "Start"}
        </Button>

        {timerHasBegan && (
          <Button
            onPress={() => {
              setTimer(60 * 30);
              setTimerIsRunning(false);
              setTimerHasBegan(false);
            }}
          >
            Reset
          </Button>
        )}

        <Button className="mt-20" onPress={() => navigation.navigate("Finish")}>
          Finish Screen
        </Button>
      </View>
    </View>
  );
};

export default TimerScreen;
