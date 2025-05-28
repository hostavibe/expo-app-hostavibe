import { useUserAndOrgInfo } from '@/src/components/boards/boards-overview/selected-board-group-context';
import { UserBoardsOverviewScreen } from '@/src/components/boards/boards-overview/user-boards-overview';
import { ThemedText } from '@/src/components/ThemedText';
import { router, useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';


const UserBoardsScreenHeader = () => {
  return (
    <Pressable
      style={styles.addButton}
      onPress={() => router.push('/(tabs)/my/boards/new')}
    >
      <ThemedText style={styles.addButtonText}>New Board</ThemedText>
    </Pressable>
  )
}


const UserBoardsScreen = () => {

  const userAndOrgInfo = useUserAndOrgInfo();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: 'My Boards kk',
      headerRight: UserBoardsScreenHeader,
    });
  }, [navigation]);

  if (userAndOrgInfo.userAndOrgType === 'none') {
    return (
      <ThemedText>User not found</ThemedText>
    )
  }

  return (
    <UserBoardsOverviewScreen 
      userId={userAndOrgInfo.userId} 
    />
  )
}

export default UserBoardsScreen;


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
