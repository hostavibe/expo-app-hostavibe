import { UserAndOrgInfoContextProvder } from '@/src/components/boards/boards-overview/selected-board-group-context';
import { BoardsScreenHeader } from '@/src/components/boards/boards-screen-header';
import { Stack } from 'expo-router';
import React from 'react';


export const MyBoardSetupsLayout = () => {

  return (
    <UserAndOrgInfoContextProvder>
      <Stack
        screenOptions={{
          headerBackTitle: 'Back',
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'My Boards - Root',
            headerRight: BoardsScreenHeader,
          }}
        />
      </Stack>
    </UserAndOrgInfoContextProvder>
  );
}

export default MyBoardSetupsLayout;
