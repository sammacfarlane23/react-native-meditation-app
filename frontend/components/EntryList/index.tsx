import { View, FlatList } from 'react-native'
import React from 'react'

import type Entry from '../../types/entry'
import EntryCard from '../EntryCard'

const EntryList = ({ entries }: { entries: Entry[] }): JSX.Element => (
    <View className="w-full h-full">
      <FlatList
        contentContainerStyle={{ paddingBottom: 100 }}
        data={entries}
        renderItem={({ item }) => <EntryCard {...item} />}
        keyExtractor={(item) => item._id ?? item.date}
      />
    </View>
)

export default EntryList
