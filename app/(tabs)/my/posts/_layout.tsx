import { ThemedText } from '@/src/components/ThemedText';
import { Stack } from 'expo-router';
import React, { createContext, useContext, useState } from 'react';
import { Pressable } from 'react-native';

type SaveContextType = {
  onSave: () => void;
  // setOnSave: (callback: () => void) => void;
  hasUnsavedChanges: boolean;
  setHasUnsavedChanges: (value: boolean) => void;
};

const SaveContext = createContext<SaveContextType>({
  onSave: () => {},
  // setOnSave: () => {},
  hasUnsavedChanges: false,
  setHasUnsavedChanges: () => {},
});

export const useSaveContext = () => useContext(SaveContext);

export const MyPostsLayout = () => {
  
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const onSave = () => {
    console.log('onSave');
  }

  return (
    <SaveContext.Provider value={{ onSave, hasUnsavedChanges, setHasUnsavedChanges }}>
      <Stack
        screenOptions={{
          headerShown: true,
          title: 'My Posts',
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'All My Posts',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="[id]"
          options={{
            title: 'Post Details',
            presentation: 'card',
            headerBackVisible: true,
            // headerBackTitle: 'Backx',
            headerLeft: () => (
              <Pressable
                onPress={() => window.history.back()}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.7 : 1,
                  padding: 8,
                })}
              >
                <ThemedText style={{ color: '#007AFF' }}>← Backx</ThemedText>
              </Pressable>
            ),
            headerRight: () => (
              <Pressable
                onPress={onSave}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.7 : 1,
                  padding: 8,
                })}
              >
                <ThemedText style={{ 
                  color: hasUnsavedChanges ? '#007AFF' : '#999',
                }}>
                  Save
                </ThemedText>
              </Pressable>
            ),
          }}
        />
      </Stack>
    </SaveContext.Provider>
  );
}

export default MyPostsLayout;
