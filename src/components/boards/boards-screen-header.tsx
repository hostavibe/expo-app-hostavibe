import { ThemedText } from "@/src/components/ThemedText";
import { OrganizationSwitcher } from "@clerk/clerk-expo/web";
import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { useUserAndOrgInfo } from "./boards-overview/selected-board-group-context";


export const BoardsScreenHeader = () => {

  // const { user } = useUser();
  // const { organization } = useOrganization();
  const userAndOrgInfo = useUserAndOrgInfo();

  if (userAndOrgInfo.userAndOrgType === 'none') {
    return null;
  }

  if (userAndOrgInfo.userAndOrgType === 'user-only') {
    return (
      <View style={styles.header}>        
        <Pressable
          style={styles.addButton}
          onPress={() => router.push('/boards/mine/new')}
        >
          <ThemedText style={styles.addButtonText}>New User Board</ThemedText>
        </Pressable>
      </View>
    )
  }

  // const userOrgs = userAndOrgInfo.getUserOrgs();
  const activeOrgId = userAndOrgInfo.activeOrgId;

  // if (!activeOrgId) {

  // const showOrganizationSwitcher = userAndOrgInfo.getUserOrgs().length > 0;
  // const showMyBoards = userAndOrgInfo.userAndOrgType === 'user-with-orgs';

  // const route = activeOrgId ? `(tabs)/boards/org/[orgId]/new` : '(tabs)/boards/mine/new';

  
  return (
    <View style={styles.header}>
      
      <OrganizationSwitcher hidePersonal={true} />
      <Pressable
        style={styles.addButton}
        // onPress={() => router.push(
        //   activeOrgId 
        //     ? {
        //         pathname: '/(tabs)/boards/org/[orgId]/new',
        //         // params: { orgId: activeOrgId }
        //       }
        //     : '/(tabs)/boards/mine/new'
        // )}
      >
        <ThemedText style={styles.addButtonText}>New Board</ThemedText>
      </Pressable>
    </View>
  )
}


const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 16,
    paddingRight: 16,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});
