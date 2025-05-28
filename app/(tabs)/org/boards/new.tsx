import { NewOrgBoardConfigScreen } from '@/src/components/boards/board-setup-screen/new-org-board-config-screen';
import { useUserAndOrgInfo } from '@/src/components/boards/boards-overview/selected-board-group-context';
import { ThemedText } from '@/src/components/ThemedText';
import React from 'react';


export const NewUserBoardSetupScreen = () => {

  const userAndOrgInfo = useUserAndOrgInfo();

  if (userAndOrgInfo.userAndOrgType !== 'user-with-orgs') {
    return <ThemedText>No orgs for user</ThemedText>;
  }

  const { userId, activeOrgId } = userAndOrgInfo;

  if (!activeOrgId) {
    return <ThemedText>No org selected</ThemedText>;
  }

  const org = userAndOrgInfo.getUserOrgs().find(org => org.organization.id === userAndOrgInfo.activeOrgId);

  return (
    <NewOrgBoardConfigScreen
      userId={userId}
      orgId={activeOrgId}
      orgName={org?.organization.name ?? 'org-???'}
    />
  )
}

export default NewUserBoardSetupScreen;
