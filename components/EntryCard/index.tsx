import { View, Text, TouchableOpacity } from "react-native";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";

import { Entry } from "../../context/entryContext";
import Duration from "../Duration";
import { parseDuration } from "../../utils";

const Card = ({ date, text, duration, id }: Entry) => {
  const { navigate } = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigate("Edit", { entry: { date, text, duration, id } })}
      className="m-4 max-w-full p-6 bg-gray-300 border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Text className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {dayjs(date).format("DD/MM/YYYY")}{" "}
          </Text>
          <Text className="ml-2 text-gray-500">
            {dayjs(date).format("HH:mm")}
          </Text>
        </View>
        <Duration duration={duration} className="text-gray-400 text-sm" />
      </View>
      {text && (
        <Text className="font-normal my-2 text-gray-700 dark:text-gray-400">
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Card;
