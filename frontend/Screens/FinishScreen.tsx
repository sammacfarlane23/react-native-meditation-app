import { View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../App";
import EntryForm from "../components/EntryForm";
import useEntries from "../context/entryContext";

type Props = NativeStackScreenProps<RootStackParamList, "Finish">;

const FinishScreen = ({ route }: Props) => {
  const { addEntry } = useEntries();
  // @TODO - use a better id generator
  const id =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  return (
    <View className="flex-1 items-center justify-between bg-alabaster dark:bg-black p-5">
      <EntryForm
        entry={{
          duration: route.params.duration,
          id,
          text: "",
          date: "",
        }}
        handleSubmit={addEntry}
      />
    </View>
  );
};

export default FinishScreen;
