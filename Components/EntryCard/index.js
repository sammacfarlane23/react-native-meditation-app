import { View, Text } from "react-native";
import dayjs from "dayjs";

const Card = ({ date, text, duration }) => (
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
      {text && <Text className="ml-5">{duration} minutes</Text>}
    </View>
    <Text className="font-normal my-2 text-gray-700 dark:text-gray-400">{text || `${duration} minute sit`}</Text>
  </View>
);

export default Card;
