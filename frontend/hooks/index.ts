import { useColorScheme } from 'nativewind'

export const useIsLightMode = (): boolean => {
  const { colorScheme } = useColorScheme()
  return colorScheme === 'light'
}
