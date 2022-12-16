import { View, Text } from "react-native";

const Card = ({ title, text, duration, type }) => {
  return (
    <View
      title={title}
      className="m-4 min-w-full p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <View className="flex-row items-center">
        <Text className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </Text>
        <Text className="ml-5">{duration} minutes</Text>
        {type && <Text className="ml-5">{type}</Text>}
      </View>
      <Text className="font-normal text-gray-700 dark:text-gray-400">
        {text}
      </Text>
    </View>
  );
};

export default Card;
