import { BoardsScreenHeader } from '@/src/components/boards/boards-screen-header';
import { Stack } from 'expo-router';
import React from 'react';


export const AllMyBoardsLayout = () => {

  return (
    <Stack
      screenOptions={{
        headerBackTitle: 'Back',
        headerTitle: 'Org Boardsxx',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Org Boards',
          headerTitle: 'Org Boards 2',
          headerRight: BoardsScreenHeader,
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name="new"
        options={{
          title: 'New Org Board',
          // headerRight: BoardsScreenHeader,
        }}
      /> */}
      {/* <Stack.Screen
        name="[oid]"
        options={{
          title: 'Org Board Details',
          presentation: 'card',
        }}
      /> */}
    </Stack>
  );
}

export default AllMyBoardsLayout;
