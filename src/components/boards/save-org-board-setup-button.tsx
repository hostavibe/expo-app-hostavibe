import { ThemedText } from "@/src/components/ThemedText";
import { Pressable } from "react-native";
import { useOrgBoardsScreenContext } from "./boards-overview/org-boards-screen-context";


export const SaveOrgBoardSetupButton = () => {
  const { isDirty, onSave } = useOrgBoardsScreenContext();

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
