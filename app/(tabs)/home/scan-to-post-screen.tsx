// import { router, useLocalSearchParams } from 'expo-router';
// import { StyleSheet, TouchableOpacity } from 'react-native';

// import { ThemedText } from '@/src/components/ThemedText';
// import { ThemedView } from '@/src/components/ThemedView';

// export const ScanToPostScreen = () => {
//   const params = useLocalSearchParams<{ scannedValue?: string }>();
  
//   return (
//     <ThemedView style={styles.container}>
//       <ThemedView style={styles.scannerContainer}>
//         <TouchableOpacity 
//           style={styles.scanButton}
//           onPress={() => router.push({
//             pathname: '/scanner-screen',
//             params: { onScan: 'scannedValue' }
//           })}
//         >
//           <ThemedText style={styles.scanButtonText}>Start Scan</ThemedText>
//         </TouchableOpacity>

//         {params.scannedValue && (
//           <ThemedView style={styles.scannedDataContainer}>
//             <ThemedText type="subtitle">Scanned Data:</ThemedText>
//             <ThemedText>{params.scannedValue}</ThemedText>
//             <TouchableOpacity 
//               style={styles.scanAgainButton}
//               onPress={() => router.push({
//                 pathname: '/scanner-screen',
//                 params: { onScan: 'scannedValue' }
//               })}
//             >
//               <ThemedText>Scan Again</ThemedText>
//             </TouchableOpacity>
//           </ThemedView>
//         )}
//       </ThemedView>
//     </ThemedView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   scannerContainer: {
//     flex: 1,
//     padding: 20,
//     gap: 20,
//   },
//   scanButton: {
//     backgroundColor: '#A1CEDC',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   scanButtonText: {
//     color: '#000',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   scannedDataContainer: {
//     padding: 15,
//     backgroundColor: 'rgba(161, 206, 220, 0.2)',
//     borderRadius: 10,
//     gap: 10,
//   },
//   scanAgainButton: {
//     backgroundColor: '#A1CEDC',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginTop: 10,
//   },
// });

// export default ScanToPostScreen;