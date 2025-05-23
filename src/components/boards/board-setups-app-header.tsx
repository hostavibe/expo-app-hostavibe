import { ThemedText } from "@/src/components/ThemedText";
import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";


export const BoardSetupsAppHeader = () => {
 
  return (
    <View style={styles.header}>
      <Pressable
        style={styles.addButton}
        onPress={() => router.push('/boards/new')}
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
