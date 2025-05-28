import { Stack } from 'expo-router';
import React from 'react';


export const HomeLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: 'Home',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          title: 'Home',
        }}
      />
      <Stack.Screen
        name="profile/index"
        options={{
          title: 'Profile',
          presentation: 'modal',
          headerShown: true,
          headerBackVisible: true,
        }}
      />
      <Stack.Screen
        name="post-to-board-screen"
        options={{
          title: 'Post to Board',
        }}
      />
    </Stack>
  );
} 

export default HomeLayout;
