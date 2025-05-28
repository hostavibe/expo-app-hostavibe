import { UserAndOrgInfoContextProvder } from '@/src/components/boards/boards-overview/selected-board-group-context';
import { Stack } from 'expo-router';
import React from 'react';

export const OrgBoardSetupsLayout = () => {
  return (
    <UserAndOrgInfoContextProvder>
      <Stack
        screenOptions={{
          headerBackTitle: 'Back',
          title: 'My Org Boards',
          headerShown: true,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'My Org Boards - Roodt',
            // headerShown: true,
            // headerBackVisible: true,
          }}
        />
        <Stack.Screen
          name="[id]/submissions"
          options={{
            title: 'My Single Org Board',
            // headerShown: false,
          }}
        />
      </Stack>
    </UserAndOrgInfoContextProvder>
  );
}

export default OrgBoardSetupsLayout;
