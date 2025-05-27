import { useUserAndOrgInfo } from '@/src/components/boards/boards-overview/selected-board-group-context';
import { UserBoardsOverviewScreen } from '@/src/components/boards/boards-overview/user-boards-overview';
import { ThemedText } from '@/src/components/ThemedText';
import React from 'react';


const RootBoardsScreen = () => {

  const userAndOrgInfo = useUserAndOrgInfo();

  if (userAndOrgInfo.userAndOrgType === 'none') {
    return (
      <ThemedText>User not found</ThemedText>
    )
  }

  return (
    <UserBoardsOverviewScreen 
      userId={userAndOrgInfo.userId} 
    />
  )
}

export default RootBoardsScreen;
