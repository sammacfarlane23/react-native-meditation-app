import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useColorScheme } from "nativewind";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const colors = require("../../constants/colors");

const Header = ({
  children,
  tintColor,
}: {
  children: string;
  tintColor?: string;
}) => {
  const navigation = useNavigation();
  const { toggleColorScheme, colorScheme } = useColorScheme();

  const isLightMode = colorScheme === "light";

  return (
    <View className="flex flex-row justify-between w-full pr-8">
      {children === "Home" ? (
        <Text className="text-raisin-black dark:text-off-white text-2xl font-bold">
          Meditation ME
        </Text>
      ) : (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather
            name="arrow-left"
            size={24}
            color={isLightMode ? colors["raisin-black"] : colors["off-white"]}
          />
        </TouchableOpacity>
      )}
      {children !== "Home" && (
        <Text className="text-raisin-black dark:text-off-white text-2xl font-bold">
          {children}
        </Text>
      )}
      <TouchableOpacity onPress={toggleColorScheme}>
        {isLightMode ? (
          <Feather name="moon" size={24} color={colors["raisin-black"]} />
        ) : (
          <Feather name="sun" size={24} color={colors["off-white"]} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Header;
