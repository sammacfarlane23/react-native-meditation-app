import { View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../App";
import EntryForm from "../components/EntryForm";
import useEntryStore from "../stores/entryStore";

type Props = NativeStackScreenProps<RootStackParamList, "Finish">;

const FinishScreen = ({ route }: Props) => {
  const addEntry = useEntryStore((state) => state.addEntry);

  return (
    <View className="flex-1 items-center justify-between bg-alabaster dark:bg-black p-5">
      <EntryForm
        entry={{
          duration: route.params.duration,
          text: "",
          date: "",
        }}
        handleSubmit={addEntry}
      />
    </View>
  );
};

export default FinishScreen;
