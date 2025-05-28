import { OrgBoardsOverviewScreen } from '@/src/components/boards/boards-overview/org-boards-overview';
import { useUserAndOrgInfo } from '@/src/components/boards/boards-overview/selected-board-group-context';
import { OrgSwitcher } from '@/src/components/org-switcher/org-switcher';
import { ThemedText } from '@/src/components/ThemedText';
import { IconSymbol } from '@/src/components/ui/IconSymbol';
import { router, useNavigation } from 'expo-router';
import React, { useLayoutEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';


const OrgBoardsScreenHeader = () => {
  return (
    <>
      <OrgSwitcher />
      <Pressable
        style={styles.addButton}
        onPress={() => router.push('/(tabs)/org/boards/new')}
      >
        <ThemedText style={styles.addButtonText}>New Board</ThemedText>
      </Pressable>
    </>
  )
}


const OrgBoardsScreen = () => {

  const userAndOrgInfo = useUserAndOrgInfo();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    if (userAndOrgInfo.userAndOrgType !== 'user-with-orgs') {
      return;
    }
     
    const org = userAndOrgInfo.getUserOrgs().find(org => org.organization.id === userAndOrgInfo.activeOrgId);
    const orgName = org?.organization.name;
    
    navigation.setOptions({
      title: `Boards for ${orgName}`,
      headerRight: OrgBoardsScreenHeader,
      // headerBackVisible: true,
      headerLeft: () => (
        <Pressable
          onPress={() => router.push('/org')}
          style={({ pressed }) => ({
            opacity: pressed ? 0.7 : 1,
            padding: 8,
            // outlineWidth: 1,
            // outlineColor: 'red',
            // outlineStyle: 'solid',
          })}
        >
          <IconSymbol name="chevron.left" size={24} color="#007AFF" />
        </Pressable>
      ),
    });
  }, [navigation, userAndOrgInfo]);

  if (userAndOrgInfo.userAndOrgType !== 'user-with-orgs') {
    return (
      <ThemedText>No orgs for user</ThemedText>
    )
  }

  if (userAndOrgInfo.activeOrgId === null) {
    return (
      <ThemedText>No active org for user</ThemedText>
    )
  }

  return (
    <OrgBoardsOverviewScreen 
      orgId={userAndOrgInfo.activeOrgId}
      orgName={userAndOrgInfo.activeOrgId}
      userId={userAndOrgInfo.userId}
    />
  )
}

export default OrgBoardsScreen;

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
