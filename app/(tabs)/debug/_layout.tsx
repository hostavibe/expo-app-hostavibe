import { Stack } from 'expo-router';
import React from 'react';


export const DebugLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: 'Debug',
        
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          title: 'Debug',
        }}
      />
    </Stack>
  );
} 

export default DebugLayout;
