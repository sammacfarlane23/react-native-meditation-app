import { View, FlatList } from "react-native";
import React from "react";
import Entry from "../../types/entry";
import EntryCard from "../EntryCard";

const EntryList = ({ entries }: { entries: Entry[] }) => {
  return (
    <View className="w-full h-full">
      <FlatList
        contentContainerStyle={{ paddingBottom: 100 }}
        data={entries}
        renderItem={({ item }) => <EntryCard {...item} />}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default EntryList;
