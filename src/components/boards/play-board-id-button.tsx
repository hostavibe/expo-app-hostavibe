import { ThemedText } from "@/src/components/ThemedText";
import { Pressable } from "react-native";
// import { useBoardsScreenContext } from "./boards-overview/selected-board-group-context";


export const PlayBoardIdButton = () => {
  // const { isDirty } = useBoardsScreenContext();
  const isDirty = false;

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
