import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';

export const HomeScreen = () => {
  const params = useLocalSearchParams<{ scannedValue?: string }>();
  
  return (
    <ThemedView style={styles.container}>

      <Pressable
        onPress={() => router.push({
          pathname: '/(tabs)/my/posts',
        })}
        style={styles.scanButton}
      >
        <ThemedText type="title">My Posts</ThemedText>
      </Pressable>

      <Pressable
        onPress={() => router.push({
          pathname: '/(tabs)/home/scan-for-board-id-screen',
          params: { onScan: 'scannedValue' }
        })}
        style={styles.scanButton}
      >
        <ThemedText type="title">Scan QR Code</ThemedText>
      </Pressable>

      <Pressable
        onPress={() => router.push({
          pathname: '/(tabs)/home/profile',
        })}
        style={styles.scanButton}
      >
        <ThemedText type="title">Profile</ThemedText>
      </Pressable>

      {params.scannedValue && (
        <ThemedView style={styles.resultContainer}>
          <ThemedText type="subtitle">Scanned Value:</ThemedText>
          <ThemedText>{params.scannedValue}</ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  scanButton: {
    backgroundColor: '#A1CEDC',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  resultContainer: {
    padding: 15,
    backgroundColor: 'rgba(161, 206, 220, 0.2)',
    borderRadius: 10,
    gap: 10,
  },
});

export default HomeScreen;