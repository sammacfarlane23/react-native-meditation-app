import { NavigationContainer } from '@react-navigation/native'
import { NativeWindStyleSheet, useColorScheme } from 'nativewind'

import HomeScreen from './Screens/HomeScreen'
import TimerScreen from './Screens/TimerScreen'
import FinishScreen from './Screens/FinishScreen'
import EditScreen from './Screens/EditScreen'
import Header from './components/Header'
import { Stack } from './components/Navigation'

NativeWindStyleSheet.setOutput({
  default: 'native'
})

function App (): JSX.Element {
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
