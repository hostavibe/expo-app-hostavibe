// import { ThemedText } from "@/src/components/ThemedText";
// import { useOrganization, useUser } from "@clerk/clerk-expo";
// import { OrganizationSwitcher } from "@clerk/clerk-expo/web";
// import { router } from "expo-router";
// import { Pressable, StyleSheet, View } from "react-native";


// export const UserBoardsScreenHeader = () => {

//   const { user } = useUser();
//   const { organization } = useOrganization();

//   const showOrganizationSwitcher = user?.organizationMemberships && user?.organizationMemberships.length > 0;

//   console.log("user", user);
//   console.log("organization", organization);

  
//   return (
//     <View style={styles.header}>
      
//       {showOrganizationSwitcher && <OrganizationSwitcher />}
//       <Pressable
//         style={styles.addButton}
//         onPress={() => router.push('/boards/new')}
//       >
//         <ThemedText style={styles.addButtonText}>New Board</ThemedText>
//       </Pressable>
//     </View>
//   )
// }


// const styles = StyleSheet.create({
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     // marginBottom: 16,
//     paddingRight: 16,
//   },
//   addButton: {
//     backgroundColor: '#4CAF50',
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 8,
//   },
//   addButtonText: {
//     color: 'white',
//     fontWeight: '600',
//   },
// });
