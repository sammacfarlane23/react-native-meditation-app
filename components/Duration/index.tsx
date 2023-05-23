import { Text } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

import { parseDuration } from "../../utils";

const Duration = ({
  duration,
  iconColor = "white",
  className,
}: {
  duration: number;
  iconColor?: string;
  className?: string;
}) => {
  return (
    <Text
      className={`text-white text-center self-start my-4 text-xl font-semibold ${className}`}
    >
      <Feather name="clock" size={18} color={iconColor} />
      {parseDuration(duration)}
    </Text>
  );
};

export default Duration;
