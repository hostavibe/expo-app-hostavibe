import { ThemedText } from "@/src/components/ThemedText";
import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { useUserAndOrgInfo } from "./boards-overview/selected-board-group-context";

export const BoardsScreenHeader = () => {
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

  return (
    <View style={styles.header}>
      <Pressable
        style={styles.addButton}
        onPress={() => router.push('/(tabs)/org/boards/new')}
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
