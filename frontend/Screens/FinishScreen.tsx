import { View } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'

import { type RootStackParamList } from '../App'
import EntryForm from '../components/EntryForm'

type Props = NativeStackScreenProps<RootStackParamList, 'Finish'>

const FinishScreen = ({ route }: Props): JSX.Element => (
    <View className="flex-1 items-center justify-between bg-alabaster dark:bg-black p-5">
      <EntryForm
        entry={{
          duration: route.params.duration,
          text: '',
          date: ''
        }}
      />
    </View>
)

export default FinishScreen
