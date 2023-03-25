import { View, Text } from "react-native";
import dayjs from "dayjs";

import { Entry } from "../../context/entryContext";
import { parseDuration } from "../../utils";

const Card = ({ date, text, duration }: Entry) => (
  <View className="m-4 min-w-full p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <View className="flex-row justify-between items-center">
      <View className="flex-row items-center">
        <Text className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {dayjs(date).format("DD/MM/YYYY")}{" "}
        </Text>
        <Text className="ml-2 text-gray-500">
          {dayjs(date).format("HH:mm")}
        </Text>
      </View>
      {/* @TODO - add a delete button */}
      {/* @TODO - add a edit button */}
      {/* @TODO - add a little clock icon to the left of the duration */}
      <Text className="ml-5">{parseDuration(duration)}</Text>
    </View>
    {text && (
      <Text className="font-normal my-2 text-gray-700 dark:text-gray-400">
        {text}
      </Text>
    )}
  </View>
);

export default Card;
