import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';
import { router } from 'expo-router';


export const HomeScreen = () => {
  
  return (
    <ThemedView style={styles.container}>

      <title>abc</title>
      
      <Pressable
        onPress={() => router.push('/home/scan-to-post')}
        style={styles.scanButton}
      >
        <ThemedText type="title">Scan to Post</ThemedText>
      </Pressable>
      <Pressable
        onPress={() => router.push('/(tabs)/debug')}
        style={styles.scanButton}
      >
        <ThemedText type="title">Debug</ThemedText>
      </Pressable>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 20,
  },
  scannerContainer: {
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
  scanButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cameraContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  closeButton: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
  },
  scannedDataContainer: {
    padding: 15,
    backgroundColor: 'rgba(161, 206, 220, 0.2)',
    borderRadius: 10,
    gap: 10,
  },
  scanAgainButton: {
    backgroundColor: '#A1CEDC',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
});

export default HomeScreen;