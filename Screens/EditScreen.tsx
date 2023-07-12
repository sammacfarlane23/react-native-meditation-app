import { View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../App";
import EntryForm from "../components/EntryForm";
import useEntries from "../context/entryContext";

type Props = NativeStackScreenProps<RootStackParamList, "Edit">;

const EditScreen = ({ route }: Props) => {
  const { updateEntry, removeEntry } = useEntries();
  const { date, duration, text, id } = route.params.entry;

  return (
    <View className="flex-1 items-center justify-between bg-alabaster dark:bg-black p-5">
      <View className="items-center">
        <View className="w-1/2 my-2">
          <EntryForm
            entry={{ date, duration, text, id }}
            handleSubmit={updateEntry}
            handleRemove={removeEntry}
          />
        </View>
      </View>
    </View>
  );
};

export default EditScreen;
