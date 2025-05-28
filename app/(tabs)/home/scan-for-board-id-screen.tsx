import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';


export const ScanForBoardIdScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const params = useLocalSearchParams<{ 
    postId?: string;
    boardId?: string;
  }>();

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    console.log("scanned", data);
    setScanned(true);
    // Return the scanned data to the previous screen
    if (params.postId) {
      
      // const newParams = { ...params, [params.onScan]: data };
      // console.log("newParams", newParams);
      // router.setParams(newParams);
      // router.back();
      router.navigate({
        pathname: '/(tabs)/home/post-to-board-screen',
        params: {
          boardId: data,
          postId: params.postId,
        },
      });
    } else {
      console.log("no postId, but scanned boardId", data);
    }
  };

  if (!permission?.granted) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>No access to camera</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
        <View style={styles.overlay}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => router.back()}
          >
            <ThemedText style={styles.closeButtonText}>Close</ThemedText>
          </TouchableOpacity>
        </View>
      </CameraView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
}); 

export default ScanForBoardIdScreen;
