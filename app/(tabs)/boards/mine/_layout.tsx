import { BoardsScreenHeader } from '@/src/components/boards/boards-screen-header';
import { Stack } from 'expo-router';
import React from 'react';


export const AllMyBoardsLayout = () => {

  return (
    <Stack
      screenOptions={{
        headerBackTitle: 'Back',
        headerTitle: 'My Boards',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'My Boards',
          headerTitle: 'My Boards 2',
          headerRight: BoardsScreenHeader,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="new"
        options={{
          title: 'New Personal Board',
          // headerRight: BoardsScreenHeader,
        }}
      />
      {/* <Stack.Screen
        name="[id]"
        options={{
          title: 'Board Details',
          presentation: 'card',
        }}
      /> */}
    </Stack>
  );
}

export default AllMyBoardsLayout;
