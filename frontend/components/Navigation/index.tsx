import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { type StackNavigationProp } from '@react-navigation/stack'
import { useNavigation as useNativeNavigation } from '@react-navigation/native'

import type Entry from '../../types/entry'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RootStackParamList = {
  Home: undefined
  Timer: undefined
  Finish: { duration: number }
  Edit: { entry: Entry }
}

export const useNavigation = (): StackNavigationProp<RootStackParamList> =>
  useNativeNavigation<StackNavigationProp<RootStackParamList>>()

export const Stack = createNativeStackNavigator<RootStackParamList>()
