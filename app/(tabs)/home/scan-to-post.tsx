import { CameraView, useCameraPermissions } from 'expo-camera';
import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';


export const HomeScreen = () => {

  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);

  
  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    console.log("BARCODE SCANNED", data)
    setScanned(true);
    setScannedData(data);
    // setShowScanner(false);
  };

  if (!permission?.granted) {
    return <ThemedView style={styles.container}><ThemedText>No access to camera</ThemedText></ThemedView>;
  }

  return (
    <ThemedView style={styles.container}>

      <ThemedView style={styles.scannerContainer}>
        <TouchableOpacity 
          style={styles.scanButton}
          onPress={() => setShowScanner(true)}
        >
          <ThemedText style={styles.scanButtonText}>Scan to Post</ThemedText>
        </TouchableOpacity>

        {scannedData && (
          <ThemedView style={styles.scannedDataContainer}>
            <ThemedText type="subtitle">Scanned Data:</ThemedText>
            <ThemedText>{scannedData}</ThemedText>
            <TouchableOpacity 
              style={styles.scanAgainButton}
              onPress={() => {
                setScannedData(null);
                setScanned(false);
                // setShowScanner(true);
              }}
            >
              <ThemedText>Scan Again</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        )}

        {showScanner && (
          <View style={styles.cameraContainer}>
            <CameraView 
              style={styles.camera}
              facing="back"
              barcodeScannerSettings={{
                barcodeTypes: ["qr"],
              }}
              // onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
              onBarcodeScanned={handleBarCodeScanned}
            >
              <View style={styles.overlay}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => {
                    setShowScanner(false);
                    setScanned(false);
                  }}
                >
                  <ThemedText style={styles.closeButtonText}>Close</ThemedText>
                </TouchableOpacity>
              </View>
            </CameraView>
          </View>
        )}
      </ThemedView>
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