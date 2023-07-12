import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../App";
import Button from "../components/Button";
import { useIsLightMode } from "../hooks";
const colors = require("../constants/colors");

const defaultMinutes = 30;

type Props = NativeStackScreenProps<RootStackParamList, "Timer">;

const TimerScreen = ({ navigation }: Props) => {
  const [timerIsRunning, setTimerIsRunning] = useState(false);
  const [minutes, setMinutes] = useState(30);
  const [timer, setTimer] = useState(60 * minutes);
  const timerHasBegan = timerIsRunning || timer < 60 * minutes;

  useEffect(() => {
    setTimer(60 * minutes);
  }, [minutes]);

  const minutesLeft = Math.floor(timer / 60);
  const secondsLeft = timer % 60;

  useEffect(() => {
    if (timerIsRunning) {
      const interval = setInterval(() => {
        if (timer <= 0) {
          navigation.navigate("Finish", { duration: minutes * 60 });
          setTimerIsRunning(false);
          return;
        }
        setTimer((timer) => timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timerIsRunning, timer]);

  const isLightMode = useIsLightMode();

  return (
    <View className="flex-1 items-center justify-center bg-alabaster dark:bg-black p-5">
      {timerHasBegan && (
        <View className="pb-10">
          <Text className="text-5xl text-raisin-black dark:text-white">{`${minutesLeft
            .toString()
            .padStart(2, "0")}:${secondsLeft
            .toString()
            .padStart(2, "0")}`}</Text>
          {timerHasBegan && !timerIsRunning && (
            <Text className="text-raisin-black dark:text-white text-lg text-center mt-4">
              Paused
            </Text>
          )}
        </View>
      )}

      {!timerHasBegan && (
        <View className="items-center mb-4">
          <Text className="text-raisin-black dark:text-white text-xl">
            Select duration:
          </Text>
          <View className="flex-row items-center">
            <Picker
              selectedValue={minutes}
              onValueChange={(itemValue, itemIndex) => setMinutes(itemValue)}
              style={{
                height: 200,
                width: 100,
                backgroundColor: "rgb(31 41 55)",
              }}
              itemStyle={{
                color: isLightMode ? colors["raisin-black"] : "white",
              }}
            >
              {[...Array(60).keys()].map((i) => (
                <Picker.Item key={i} label={(i + 1).toString()} value={i + 1} />
              ))}
            </Picker>
            <Text className="text-2xl text-raisin-black dark:text-white">
              Minutes
            </Text>
          </View>
        </View>
      )}

      <View className="w-1/2">
        <Button
          className="mb-6"
          onPress={() => {
            setTimerIsRunning(!timerIsRunning);
          }}
        >
          {timerIsRunning ? "Pause" : "Start"}
        </Button>

        {timerHasBegan && (
          <>
            <Button
              onPress={() => {
                setTimer(minutes * 60);
                setTimerIsRunning(false);
              }}
            >
              Reset
            </Button>

            <Button
              className="mt-20"
              onPress={() => {
                setTimer(minutes * 60);
                setTimerIsRunning(false);
                navigation.navigate("Finish", {
                  duration: minutes * 60 - timer,
                });
              }}
            >
              Finish
            </Button>
          </>
        )}
      </View>
    </View>
  );
};

export default TimerScreen;
