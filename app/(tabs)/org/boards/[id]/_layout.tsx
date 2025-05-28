// import { OrgBoardsScreenContextProvider } from '@/src/components/boards/boards-overview/org-boards-screen-context';
// import { convertIdSearchParamToBoardIds } from '@/src/zod-types/branded-strings/board-id';
// import { Stack, useLocalSearchParams } from 'expo-router';
// import React from 'react';


// export const OrgBoardDetailsLayout = () => {

//   const localSearchParams = useLocalSearchParams();
//   const { boardUuid } = convertIdSearchParamToBoardIds(localSearchParams);
//   // const orgId = localSearchParams['org-id'] as string;

//   console.log('org board details layout boardUuid', boardUuid);

//   return (
//     <OrgBoardsScreenContextProvider
//       boardUuid={boardUuid}
//       boardOwnerType='org'
//     > 
//       <Stack
//         screenOptions={{
//           headerBackTitle: 'Back',
//           // headerTitle: 'My Boards',
//           // headerShown: false,
//         }}
//       >
//         <Stack.Screen
//           name="index"
//           options={{
//             title: 'Org Board Details',
//             // headerTitle: 'org Board Details 2',
//             headerShown: true,
//             headerBackVisible: true,
//           }}
//         />
//         <Stack.Screen
//           name="submissions"
//           options={{
//             title: 'Board Submissions',
//             headerShown: false,
//           }}
//         />
//       </Stack>
//     </OrgBoardsScreenContextProvider>
//   );
// }

// export default OrgBoardDetailsLayout;
