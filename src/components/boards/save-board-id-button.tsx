import { useSaveBoardSetupContext } from "@/src/components/boards/save-board-setup-context";
import { ThemedText } from "@/src/components/ThemedText";
import { Pressable } from "react-native";


export const SaveBoardIdButton = () => {
  const { isDirty, onSave } = useSaveBoardSetupContext();

  return (
    <Pressable
      style={({ pressed }) => ({
        opacity: pressed ? 0.7 : 1,
        padding: 18,
      })}
      disabled={!isDirty}
      onPress={onSave}
    >
      <ThemedText style={{ color: '#007AFF' }}>{isDirty ? 'Save - isDirty' : 'No Save'}</ThemedText>
    </Pressable>
  );
};
