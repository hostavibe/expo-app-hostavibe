import { OrgBoardsOverviewScreen } from "@/src/components/boards/boards-overview/org-boards-overview";
import { useUserAndOrgInfo } from "@/src/components/boards/boards-overview/selected-board-group-context";
import { ThemedText } from "@/src/components/ThemedText";


export const OrgBoardDetailsScreen = () => {

  const userAndOrgInfo = useUserAndOrgInfo();

  if (userAndOrgInfo.userAndOrgType !== 'user-with-orgs') {
    return (
      <ThemedText>No user or org found</ThemedText>
    )
  }
  return (
    <OrgBoardsOverviewScreen
      orgId={userAndOrgInfo.activeOrgId!}
      orgName={userAndOrgInfo.activeOrgId!}
      userId={userAndOrgInfo.userId}
    />  )
}

export default OrgBoardDetailsScreen;
