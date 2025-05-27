import { NewUserBoardConfigScreen } from '@/src/components/boards/board-setup-screen/new-user-board-config-screen';
import { ThemedText } from '@/src/components/ThemedText';
import { useUser } from '@clerk/clerk-expo';
import React from 'react';


export const NewUserBoardSetupScreen = () => {
  const { user } = useUser();

  if (!user) {
    return <ThemedText>User not found</ThemedText>;
  }

  return (
    <NewUserBoardConfigScreen
      userId={user.id}
    />
  )
}

export default NewUserBoardSetupScreen;
