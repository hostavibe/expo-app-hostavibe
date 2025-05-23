import { BoardSetupIdAppHeader } from '@/src/components/boards/board-setup-id-app-header';
import { BoardSetupsAppHeader } from '@/src/components/boards/board-setups-app-header';
import { SaveBoardSetupContextProvider } from '@/src/components/boards/save-board-setup-context';
import { Stack } from 'expo-router';
import React from 'react';

// type FullscreenContextType = {
//   isFullscreen: boolean;
//   setIsFullscreen: (value: boolean) => void;
// };

// export const FullscreenContext = createContext<FullscreenContextType>({
//   isFullscreen: false,
//   setIsFullscreen: () => {},
// });

// export const useFullscreen = () => useContext(FullscreenContext);


export const BoardSetupsLayout = () => {
  // const { isFullscreen } = useFullscreen();

  return (
    <SaveBoardSetupContextProvider>
      <Stack
        screenOptions={{
          // Show header for all screens by default
          // headerShown: !isFullscreen,
          // Use default back button
          headerBackTitle: 'Back',
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            // Hide header completely for the main list
            // headerShown: false,
            title: 'Boards',
            headerRight: BoardSetupsAppHeader,
          }}
        />
        <Stack.Screen
          name="new"
          options={{
            title: 'New Board',
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="[id]/index"
          options={{
            title: 'Board Details',
            presentation: 'card',
            headerRight: BoardSetupIdAppHeader,
            // headerBackVisible: true,
            // headerBackTitle: 'Back',
            headerTitleAlign: 'center'
          }}
        />
        <Stack.Screen
          name="[id]/submissions"
          options={{
            title: 'Submissions',
            presentation: 'card',
            // headerRight: BoardSetupIdAppHeader,
            // headerBackVisible: true,
            // headerBackTitle: 'Back',
            headerTitleAlign: 'center'
          }}
        />
        {/* <Stack.Screen
          name="[id]/play"
          options={{
            title: 'Play Board',
            presentation: 'card',
            animation: 'none',
          }}
        /> */}
      </Stack>
    </SaveBoardSetupContextProvider>
  );
}

export default BoardSetupsLayout;
