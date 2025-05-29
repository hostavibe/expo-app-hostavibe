import { UserBoardsScreenContextProvider } from '@/src/components/boards/boards-overview/user-boards-screen-context';
import { BoardsScreenHeader } from '@/src/components/boards/boards-screen-header';
import { convertIdSearchParamToBoardIdentifiers } from '@/src/zod-types/branded-strings/board-id';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';


export const MyBoardDetailsLayout = () => {

  const localSearchParams = useLocalSearchParams();
  const { boardUuid } = convertIdSearchParamToBoardIdentifiers(localSearchParams);

  return (
    <UserBoardsScreenContextProvider
      boardUuid={boardUuid}
      boardOwnerType='user'
    > 
      <Stack
        screenOptions={{
          headerBackTitle: 'Back',
          headerTitle: 'My Boards',
          headerShown: true,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'Board Details',
            headerTitle: 'Board Details 2',
            headerRight: BoardsScreenHeader,
            // headerShown: false,
          }}
        />
        <Stack.Screen
          name="submissions"
          options={{
            headerTitle: 'Board Submissions',
            // headerShown: false,
          }}
        />
      </Stack>
    </UserBoardsScreenContextProvider>
  );
}

export default MyBoardDetailsLayout;
