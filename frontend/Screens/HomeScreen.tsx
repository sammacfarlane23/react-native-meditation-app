import { Text, View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import dayjs from 'dayjs'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useCallback } from 'react'

import Button from '../components/Button'
import { type RootStackParamList } from '../components/Navigation'
import EntryList from '../components/EntryList'
import { useIsLightMode } from '../hooks'
import useEntryStore from '../stores/entryStore'

const colors = require('../constants/colors')

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

const HomeScreen = ({ navigation, route }: Props): JSX.Element => {
  const { entries, error, loading, getAllEntries } = useEntryStore(
    ({ entries, error, loading, getAllEntries }) => ({
      entries,
      error,
      loading,
      getAllEntries
    })
  )

  const isLightMode = useIsLightMode()

  const sortedEntries = entries?.sort((a, b) =>
    dayjs(a.date).isAfter(dayjs(b.date)) ? -1 : 1
  )

  useFocusEffect(
    useCallback(() => {
      const fetchEntries = async (): Promise<void> => {
        await getAllEntries()
      }

      fetchEntries()
    }, [])
  )

  return (
    <View className="flex-1 h-full items-center bg-alabaster dark:bg-dark-gray justify-start px-2 pt-8">
      {!loading && error !== '' && (
        <Text className="mt-5 text-lg font-bold text-black dark:text-off-white">
          {error}
        </Text>
      )}
      {loading && (
        <Text className="mt-5 text-lg font-bold text-black dark:text-off-white">
          Loading...
        </Text>
      )}
      {/* {showCelebration && <Celebration />} */}
      {!loading && error.length === 0 && <EntryList entries={sortedEntries} />}
      <View className="absolute bottom-16" style={{ width: 160 }}>
        <Button
          className="rounded-full w-full h-full flex items-center justify-center py-3 bg-myrtle-green dark:bg-red"
          textClassName="text-3xl text-alabaster dark:text-black"
          onPress={() => {
            navigation.navigate('Timer')
          }}
        >
          Start{' '}
          <MaterialCommunityIcons
            name="meditation"
            size={32}
            color={isLightMode ? colors.alabaster : 'black'}
          />
        </Button>
      </View>
    </View>
  )
}

export default HomeScreen
