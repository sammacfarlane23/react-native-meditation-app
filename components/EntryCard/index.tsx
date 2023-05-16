import { View, Text } from "react-native";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";

import useEntries, { Entry } from "../../context/entryContext";
import { parseDuration } from "../../utils";
import Button from "../Button";

const Card = ({ date, text, duration, id }: Entry) => {
  const { removeEntry } = useEntries();
  const { navigate } = useNavigation();

  return (
    <View className="m-4 max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Text className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {dayjs(date).format("DD/MM/YYYY")}{" "}
          </Text>
          <Text className="ml-2 text-gray-500">
            {dayjs(date).format("HH:mm")}
          </Text>
        </View>
        {/* @TODO - add a little clock icon to the left of the duration */}
        <Text className="ml-5">{parseDuration(duration)}</Text>
      </View>
      {text && (
        <Text className="font-normal my-2 text-gray-700 dark:text-gray-400">
          {text}
        </Text>
      )}
      <View className="mt-4">
        <Button
          onPress={() =>
            navigate("Edit", { entry: { date, text, duration, id } })
          }
        >
          Edit
        </Button>
        <Button
          onPress={() => removeEntry(id)}
          className="bg-red-600 w-1/2 my-4"
        >
          Delete
        </Button>
      </View>
    </View>
  );
};

export default Card;
