import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'

import { parseDate } from '../../utils'
import type Entry from '../../types/entry'
import Duration from '../Duration'
import { useIsLightMode } from '../../hooks'
import Button from '../Button'
import useEntryStore from '../../stores/entryStore'
import { useNavigation } from '../Navigation'

const colors = require('../../constants/colors')

const EntryForm = ({
  entry,
  isEditing = false
}: {
  entry: Entry
  isEditing?: boolean
}): JSX.Element => {
  const { addEntry, deleteEntry, updateEntry, error } = useEntryStore(
    ({ getAllEntries, addEntry, deleteEntry, updateEntry, error }) => ({
      getAllEntries,
      addEntry,
      deleteEntry,
      updateEntry,
      error
    })
  )

  const [entryText, setEntryText] = useState<string>('')
  const { date, duration, text, _id } = entry
  const [entryDate, setEntryDate] = useState<string>(date)

  const navigation = useNavigation()

  useEffect(() => {
    setEntryDate(date || dayjs().format('YYYY-MM-DD HH:mm:ss'))

    setEntryText(text ?? '')
  }, [])

  const handleSaveEntry = async (): Promise<void> => {
    if (isEditing && _id) {
      const response = await updateEntry(_id, { text: entryText })
      if (response?.ok) navigation.navigate('Home')

      return
    }

    const response = await addEntry({
      text: entryText,
      date: entryDate,
      duration
    })
    if (response?.ok) navigation.navigate('Home')
  }

  const handleSaveEntryMetaData = async (): Promise<void> => {
    const response = await addEntry({
      text: '',
      date: entryDate,
      duration
    })

    if (response?.ok) navigation.navigate('Home')
  }

  const handleDeleteEntry = async (): Promise<void> => {
    if (!_id) return
    const response = await deleteEntry(_id)
    if (response?.ok) navigation.navigate('Home')
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss()
      }}
    >
      <View className="items-center">
        <Text className="text-raisin-black dark:text-white my-4 self-start text-4xl font-semibold">
          {parseDate(entryDate)}{' '}
        </Text>
        <Duration
          className="text-raisin-black dark:text-off-white"
          iconColor={
            useIsLightMode() ? colors['raisin-black'] : colors['off-white']
          }
          duration={duration}
        />
        <TextInput
          className="w-96 my-8 px-3 py-3 text-off-white dark:text-raisin-black bg-taupe-gray dark:bg-french-gray h-48 rounded-md"
          multiline={true}
          onChangeText={setEntryText}
          value={entryText}
          placeholderTextColor={useIsLightMode() ? 'white' : 'black'}
          placeholder="How did this session make you feel?"
          onBlur={() => {
            Keyboard.dismiss()
          }}
        />
        <View className="w-1/2 my-2">
          {entryText && (
            <Button
              onPress={handleSaveEntry}
              className="bg-french-gray dark:bg-green"
            >
              Save
            </Button>
          )}
          {!isEditing && (
            <Button
              onPress={handleSaveEntryMetaData}
              className="mt-4 bg-french-gray"
            >
              Skip journaling
            </Button>
          )}
          {isEditing && (
            <Button
              onPress={handleDeleteEntry}
              className="bg-red-600 w-1/2 my-4 bg-red"
            >
              Delete
            </Button>
          )}
        </View>
          {error && (
            <Text className="mt-5 text-lg font-bold text-red">
              {error}
            </Text>
          )}
      </View>
    </TouchableWithoutFeedback>
  )
}

export default EntryForm
