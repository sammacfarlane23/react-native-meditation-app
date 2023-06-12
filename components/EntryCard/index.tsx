import { View, Text, TouchableOpacity } from "react-native";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";

import { Entry } from "../../context/entryContext";
import Duration from "../Duration";
import { parseDuration, parseDate } from "../../utils";

const Card = ({ date, text, duration, id }: Entry) => {
  const { navigate } = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigate("Edit", { entry: { date, text, duration, id } })}
      className="m-4 max-w-full p-6 bg-gray-900 border rounded-lg shadow-md"
    >
      <Text className="text-3xl font-bold tracking-tight text-off-white">
        {parseDate(date)}
      </Text>

      <Duration duration={duration} iconColor="#0F7173" className="text-sm text-off-white" />

      {text && (
        <Text className="font-normal text-md mb-2 mt-6 text-french-gray">
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Card;
