import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Hi there - edit app/index2.tsx to edit this screen.</Text>

      <Button
        title="Go to Home Screen"
        onPress={() => router.push('/(tabs)/home')}
      />
    </View>
  );
}
