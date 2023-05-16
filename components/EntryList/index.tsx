import { View, FlatList } from "react-native";
import React from "react";
import { Entry } from "../../context/entryContext";
import EntryCard from "../EntryCard";

const EntryList = ({ entries }: Entry[]) => {
  return (
    <View className="pb-20">
      <FlatList
        data={entries}
        renderItem={({ item }) => <EntryCard {...item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default EntryList;
