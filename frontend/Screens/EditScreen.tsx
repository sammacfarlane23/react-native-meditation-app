import { View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../App";
import EntryForm from "../components/EntryForm";
import useEntries from "../context/entryContext";
import useEntryStore from "../stores/entryStore";

type Props = NativeStackScreenProps<RootStackParamList, "Edit">;

const EditScreen = ({ route }: Props) => {
  const deleteEntry = useEntryStore((state) => state.deleteEntry);
  const updateEntry = useEntryStore((state) => state.updateEntry);
  const { date, duration, text, _id } = route.params.entry;

  return (
    <View className="flex-1 items-center justify-between bg-alabaster dark:bg-black p-5">
      <View className="items-center">
        <View className="w-1/2 my-2">
          <EntryForm
            entry={{ date, duration, text, _id }}
            handleSubmit={updateEntry}
            handleRemove={deleteEntry}
          />
        </View>
      </View>
    </View>
  );
};

export default EditScreen;
