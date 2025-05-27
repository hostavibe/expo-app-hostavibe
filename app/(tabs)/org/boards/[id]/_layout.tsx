import { OrgBoardsScreenContextProvider } from '@/src/components/boards/boards-overview/org-boards-screen-context';
import { BoardsScreenHeader } from '@/src/components/boards/boards-screen-header';
import { convertIdSearchParamToBoardIds } from '@/src/zod-types/branded-strings/board-id';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';


export const OrgBoardDetailsLayout = () => {

  const localSearchParams = useLocalSearchParams();
  const { boardUuid } = convertIdSearchParamToBoardIds(localSearchParams);
  // const orgId = localSearchParams['org-id'] as string;

  console.log('org board details layout boardUuid', boardUuid);

  return (
    <OrgBoardsScreenContextProvider
      boardUuid={boardUuid}
      boardOwnerType='org'
    > 
      <Stack
        screenOptions={{
          headerBackTitle: 'Back',
          headerTitle: 'My Boards',
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'Board Details',
            headerTitle: 'org Board Details 2',
            headerRight: BoardsScreenHeader,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="submissions"
          options={{
            title: 'Board Submissions',
            headerShown: false,
          }}
        />
      </Stack>
    </OrgBoardsScreenContextProvider>
  );
}

export default OrgBoardDetailsLayout;
