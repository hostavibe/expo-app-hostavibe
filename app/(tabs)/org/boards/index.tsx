import { OrgBoardsOverviewScreen } from '@/src/components/boards/boards-overview/org-boards-overview';
import { useUserAndOrgInfo } from '@/src/components/boards/boards-overview/selected-board-group-context';
import { ThemedText } from '@/src/components/ThemedText';
import React from 'react';


const RootBoardsScreen = () => {

  const userAndOrgInfo = useUserAndOrgInfo();

  if (userAndOrgInfo.userAndOrgType !== 'user-with-orgs') {
    return (
      <ThemedText>No orgs for user</ThemedText>
    )
  }

  if (userAndOrgInfo.activeOrgId === null) {
    return (
      <ThemedText>No active org for user</ThemedText>
    )
  }

  return (
    <OrgBoardsOverviewScreen 
      orgId={userAndOrgInfo.activeOrgId}
      orgName={userAndOrgInfo.activeOrgId}
      userId={userAndOrgInfo.userId}
    />
  )
}

export default RootBoardsScreen;
