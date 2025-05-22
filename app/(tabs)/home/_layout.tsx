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
        name="scan-to-post"
        options={{
          title: 'Scan to Post',
          presentation: 'modal',
        }}
      />
    </Stack>
  );
} 

export default HomeLayout;
