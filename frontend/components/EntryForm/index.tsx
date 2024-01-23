import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import dayjs from 'dayjs'

import { parseDate } from '../../utils'
import type Entry from '../../types/entry'
import Duration from '../Duration'
import { useIsLightMode } from '../../hooks'
import Button from '../Button'
import useEntryStore from '../../stores/entryStore'

const colors = require('../../constants/colors')

const EntryForm = ({
  entry,
  isEditing = false
}: {
  entry: Entry
  isEditing?: boolean
}): JSX.Element => {
  const getAllEntries = useEntryStore((state) => state.getAllEntries)
  const addEntry = useEntryStore((state) => state.addEntry)
  const deleteEntry = useEntryStore((state) => state.deleteEntry)
  const updateEntry = useEntryStore((state) => state.updateEntry)
  const [entryText, setEntryText] = useState<string | undefined>('')
  const { date, duration, text, _id } = entry
  const [entryDate, setEntryDate] = useState<string>(date)

  const navigation = useNavigation()

  useEffect(() => {
    setEntryDate(date || dayjs().format('YYYY-MM-DD HH:mm:ss'))

    setEntryText(text)
  }, [])

  return (
    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
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
          onBlur={() => { Keyboard.dismiss() }}
        />
        <View className="w-1/2 my-2">
          {entryText && (
            <Button
              onPress={() => {
                isEditing && _id
                  ? updateEntry(_id, { text: entryText })
                  // @TODO: Make sure this works
                  : addEntry({
                    text: entryText,
                    date: entryDate,
                    duration
                  })
                navigation.navigate('Home', { celebrate: true })
                getAllEntries()
              }}
              className="bg-french-gray dark:bg-green"
            >
              Save
            </Button>
          )}
          {!isEditing && (
            <Button
              onPress={() => {
                addEntry({
                  text: '',
                  date,
                  duration
                })
                navigation.navigate('Home', { celebrate: true })
              }}
              className="mt-4 bg-french-gray"
            >
              Skip journaling
            </Button>
          )}
          {isEditing && _id && (
            <Button
              onPress={() => {
                deleteEntry(_id)
                navigation.navigate('Home')
                getAllEntries()
              }}
              className="bg-red-600 w-1/2 my-4 bg-red"
            >
              Delete
            </Button>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default EntryForm
