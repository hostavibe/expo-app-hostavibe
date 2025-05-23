import { useSaveBoardSetupContext } from "@/src/components/boards/save-board-setup-context";
import { ThemedText } from "@/src/components/ThemedText";
import { Pressable } from "react-native";


export const PlayBoardIdButton = () => {
  const { isDirty, boardUuid } = useSaveBoardSetupContext();

  const onPlay = () => {
    console.log('play');
    // router.push(`/(actions)/boards/board_${boardUuid}`);
  }

  return (
    <Pressable
      style={({ pressed }) => ({
        opacity: pressed ? 0.7 : 1,
        padding: 18,
      })}
      disabled={isDirty}
      onPress={onPlay}
    >
      <ThemedText style={{ color: '#007AFF' }}>{isDirty ? 'Cannot Play - Dirty' : 'Play'}</ThemedText>
    </Pressable>
  );
};
