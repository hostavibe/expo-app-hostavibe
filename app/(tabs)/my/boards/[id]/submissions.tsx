import { fetchUserBoardPostSubmissions } from "@/src/api/supabase-db/board-post-submissions";
import { useUserBoardsScreenContext } from "@/src/components/boards/boards-overview/user-boards-screen-context";
import { ThemedText } from "@/src/components/ThemedText";
import { useUserContext } from "@/src/hooks/user-context";
import { useEffect } from "react";
import { Text, View } from "react-native";


export const MyBoardSubmissionsScreen = () => {
  // const navigation = useNavigation();

  const {
    // setBoardIdentity,
    boardUuid,
    isLoading,
    currentBoardSetup,
    updateCurrentBoardSetup,
    error,
  } = useUserBoardsScreenContext();

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     title: 'My Board Submissions',
  //     headerShown: true,
  //   });
  // }, [navigation]);

  const { supabase } = useUserContext();

  useEffect(() => {

    if (!boardUuid) {
      return;
    }

    const doFetch = async () => {
      const submissions = await fetchUserBoardPostSubmissions(supabase, boardUuid);
      console.log('submissions', submissions);
    }

    doFetch();

  }, [boardUuid, supabase]);

  return (
    <View>
      <Text>My Board Submissions - {currentBoardSetup?.name}</Text>
      <ThemedText>Submit a Post</ThemedText>
    </View>
  )
}

export default MyBoardSubmissionsScreen;