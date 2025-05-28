import { ThemedText } from "@/src/components/ThemedText";
import { OrgBoardIdPrefix } from "@/src/zod-types/branded-strings/board-id";
import { router } from "expo-router";
import { Pressable } from "react-native";
import { useOrgBoardsScreenContext } from "./boards-overview/org-boards-screen-context";


export const PlayOrgBoardIdButton = () => {
  const { isDirty, boardUuid } = useOrgBoardsScreenContext();

  const boardId = `${OrgBoardIdPrefix}${boardUuid}`;

  const onPlay = () => {
    console.log('play');
    router.push({
      pathname: '/(actions)/play-board/[id]',
      params: {
        id: boardId,
      },
    });
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
