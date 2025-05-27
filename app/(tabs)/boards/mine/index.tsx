import { useUserAndOrgInfo } from "@/src/components/boards/boards-overview/selected-board-group-context";
import { UserBoardsOverviewScreen } from "@/src/components/boards/boards-overview/user-boards-overview";
import { ThemedText } from "@/src/components/ThemedText";


export const MyBoardDetailsScreen = () => {

  const userAndOrgInfo = useUserAndOrgInfo();

  if (userAndOrgInfo.userAndOrgType === 'none') {
    return (
      <ThemedText>No user or org found</ThemedText>
    )
  }
  return (
    <UserBoardsOverviewScreen userId={userAndOrgInfo.userId} />  )
}

export default MyBoardDetailsScreen;
