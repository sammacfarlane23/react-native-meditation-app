import { useColorScheme } from "nativewind";

export const useIsLightMode = () => {
  const { colorScheme } = useColorScheme();
  return colorScheme === "light";
};
