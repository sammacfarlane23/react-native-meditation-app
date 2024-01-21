import { View, Text, TouchableOpacity } from "react-native";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";

import Entry from "../../types/entry";
import Duration from "../Duration";
import { parseDuration, parseDate } from "../../utils";
import colors from "../../constants/colors";
import { useIsLightMode } from "../../hooks";

const Card = ({ date, text, duration, _id }: Entry) => {
  const { navigate } = useNavigation();
  const isLightMode = useIsLightMode();

  return (
    <TouchableOpacity
      onPress={() => navigate("Edit", { entry: { date, text, duration, _id } })}
      className="m-4 max-w-full p-6 bg-taupe-gray dark:bg-medium-gray rounded-lg shadow-md"
    >
      <Text className="text-3xl font-bold tracking-tight text-off-white">
        {parseDate(date)}
      </Text>

      <Duration
        duration={duration}
        iconColor={isLightMode ? colors["raisin-black"] : colors.green}
        className="text-sm text-off-white"
      />

      {text && (
        <Text className="font-normal text-md mb-2 mt-6 text-french-gray">
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Card;
