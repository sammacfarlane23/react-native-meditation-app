import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Animated, { BounceIn, BounceOut } from "react-native-reanimated";

import Confetti from "../Confetti";

const AnimatedText = () => {
  return (
    <Animated.View entering={BounceIn} exiting={BounceOut}>
      <Text className="text-4xl font-bold dark:text-off-white">
        Congratulations!
      </Text>
    </Animated.View>
  );
};

const Celebration = () => {
  const [showText, setShowText] = useState<boolean>(true);

  useEffect(() => {
    setShowText(true);
    const timer = setTimeout(() => {
      setShowText(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="z-50 w-100 absolute top-10">
      {showText ? (
        <AnimatedText />
      ) : (
        <View>
          <Text className="text-4xl font-bold dark:text-off-white opacity-0">
            Congratulations!
          </Text>
        </View>
      )}
      <Confetti />
    </View>
  );
};

export default Celebration;
