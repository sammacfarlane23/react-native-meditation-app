import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { styled, useColorScheme } from "nativewind";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import colors from "../../constants/colors";

const Header = ({
  children,
  tintColor,
}: {
  children: string;
  tintColor?: string | undefined;
}) => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const navigation = useNavigation();

  console.log({ children });

  return (
    <View className="flex flex-row justify-between w-full pr-8">
      {children !== "Home" && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color={colors["raisin-black"]} />
        </TouchableOpacity>
      )}
      <Text className="text-raisin-black dark:text-off-white text-2xl font-bold">
        {children === "Home" ? "Meditation ME" : children}
      </Text>
      <TouchableOpacity onPress={toggleColorScheme}>
        {colorScheme === "light" ? (
          <Feather name="moon" size={24} color="black" />
        ) : (
          <Feather name="sun" size={24} color="white" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Header;
