import { UserAndOrgInfoContextProvder } from '@/src/components/boards/boards-overview/selected-board-group-context';
import { Stack } from 'expo-router';
import React from 'react';


export const OrgLayout = () => {

  return (
    <UserAndOrgInfoContextProvder>
      <Stack
        screenOptions={{
          headerBackTitle: 'Back',
          title: 'My Orgss',
          headerShown: false,
        }}
      >
        {/* <Stack.Screen
          name="index"
          // options={{
          //   title: 'My Org',
          //   headerRight: BoardsScreenHeader,
          // }}
        /> */}
        <Stack.Screen
          name="org/boards"
          options={{
            title: 'My Org Boards',
            // headerRight: BoardsScreenHeader,
            headerShown: true,
            headerBackVisible: true,
          }}
        />
      </Stack>
    </UserAndOrgInfoContextProvder>
  );
}

export default OrgLayout;
