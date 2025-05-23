import { FzbScreenConfigData } from "@/src/zod-types/screen-config/fzb-screen-config";
import { Text, View } from "react-native";


interface ScreenConfigEditorProps {
  screenConfig: FzbScreenConfigData;
}

export const ScreenConfigEditor = ({ screenConfig }: ScreenConfigEditorProps) => {

  
  return (
    <View>
      <Text>Screen Config Editor - {screenConfig.screenType}</Text>
  </View>
  );
};
