import { StyleSheet, Text, View } from 'react-native';

export const ScreenContentPermanentBlank = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This screen is intentionally blank</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
  },
});
