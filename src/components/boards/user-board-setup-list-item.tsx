import { ThemedText } from "@/src/components/ThemedText";
import { UserBoardSetupDbRowFull } from "@/src/zod-types/boards/user-board-setup-db-row";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";


interface UserBoardSetupItemProps {
  item: UserBoardSetupDbRowFull;
  onDelete: (id: string) => void;
  onLaunch: (id: string) => void;
}

export const UserBoardSetupListItem = ({ item, onDelete, onLaunch }: UserBoardSetupItemProps) => {

  const handleDelete = () => {
    Alert.alert(
      "Delete Board Setup",
      "Are you sure you want to delete this board setup?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => onDelete?.(item.id)
        }
      ]
    );
  };

  const handleSubmissions = () => {
    // const boardId = `board_${item.id}`;
    // const submissionsRoute = `/boards/mine/${boardId}/submissions`;
    // console.log('submissionsRoute', submissionsRoute);
    // router.push(submissionsRoute as any);

    router.push({
      pathname: `/(tabs)/my/boards/[id]/submissions`,
      params: {
        id: `board_${item.id}`
      }
      
      // pathname: '/(tabs)/boards/mine/[zboardId]',
      // params: { zboardId: `board_${item.id}` }
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ThemedText type="title">{item.name}</ThemedText>
        <ThemedText style={styles.description}>{item.description}</ThemedText>
        <ThemedText style={styles.date}>
          Created: {new Date(item.created_at).toLocaleDateString()}
        </ThemedText>
      </View>
      <View style={styles.actions}>
        <Pressable onPress={handleSubmissions} style={styles.button}>
          <Ionicons name="list-outline" size={24} color="#007AFF" />
        </Pressable>
        <Pressable onPress={() => onLaunch?.(item.id)} style={styles.button}>
          <Ionicons name="play" size={24} color="#007AFF" />
        </Pressable>
        <Pressable onPress={handleDelete} style={styles.button}>
          <Ionicons name="trash-outline" size={24} color="#FF3B30" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
  },
  content: {
    flex: 1,
    marginRight: 16,
  },
  description: {
    marginTop: 4,
    color: '#666',
  },
  date: {
    marginTop: 8,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    padding: 8,
  },
});
