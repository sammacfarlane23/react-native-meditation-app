import { Text, TouchableOpacity } from 'react-native'

import { useNavigation } from '../Navigation'
import type Entry from '../../types/entry'
import Duration from '../Duration'
import { parseDate } from '../../utils'
import { useIsLightMode } from '../../hooks'

const colors = require('../../constants/colors')

const Card = ({ date, text, duration, _id }: Entry): JSX.Element => {
  const { navigate } = useNavigation()
  const isLightMode = useIsLightMode()

  return (
    <TouchableOpacity
      onPress={() => { navigate('Edit', { entry: { date, text, duration, _id } }) }}
      className="m-4 max-w-full p-6 bg-taupe-gray dark:bg-medium-gray rounded-lg shadow-md"
    >
      <Text className="text-3xl font-bold tracking-tight text-off-white">
        {parseDate(date)}
      </Text>

      <Duration
        duration={duration}
        iconColor={isLightMode ? colors['raisin-black'] : colors.green}
        className="text-sm text-off-white"
      />

      {text && (
        <Text className="font-normal text-md mb-2 mt-6 text-french-gray">
          {text}
        </Text>
      )}
    </TouchableOpacity>
  )
}

export default Card
