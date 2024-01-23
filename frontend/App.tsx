import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NativeWindStyleSheet, useColorScheme } from 'nativewind'

import HomeScreen from './screens/HomeScreen'
import TimerScreen from './screens/TimerScreen'
import FinishScreen from './screens/FinishScreen'
import type Entry from './types/entry'
import EditScreen from './screens/EditScreen'
import Header from './components/Header'

NativeWindStyleSheet.setOutput({
  default: 'native'
})

export interface RootStackParamList {
  Home: undefined
  Timer: undefined
  Finish: { duration: number }
  Edit: { entry: Entry }
}

const Stack = createNativeStackNavigator<RootStackParamList>()

function App () {
  const { colorScheme } = useColorScheme()

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colorScheme === 'light' ? '#E8EBE4' : '#030712'
          },
          headerTintColor: '#E7ECEF',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20
          },
          headerTitle: (props) => <Header {...props} />,
          headerBackVisible: false
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Timer" component={TimerScreen} />
        <Stack.Screen name="Finish" component={FinishScreen} />
        <Stack.Screen name="Edit" component={EditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
