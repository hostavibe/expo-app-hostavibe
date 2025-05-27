import { ThemedText } from "@/src/components/ThemedText";
import { Pressable } from "react-native";
// import { useBoardsScreenContext } from "./boards-overview/selected-board-group-context";


export const SaveBoardIdButton = () => {
  // const { isDirty, onSave } = useBoardsScreenContext();

  const isDirty = false;

  return (
    <Pressable
      style={({ pressed }) => ({
        opacity: pressed ? 0.7 : 1,
        padding: 18,
      })}
      // disabled={!isDirty}
      // onPress={onSave}
    >
      <ThemedText style={{ color: '#007AFF' }}>{isDirty ? 'Save - isDirty' : 'No Save'}</ThemedText>
    </Pressable>
  );
};
