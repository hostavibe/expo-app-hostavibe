import { FzbBoardPromo } from "@/zod-types/board-setup/board-types/fzb-board-promo";
import { Text, View } from "react-native";


interface PromoBoardConfigEditorProps {
  boardConfig: FzbBoardPromo;
}

export const PromoBoardConfigEditor = ({ boardConfig }: PromoBoardConfigEditorProps) => {
  return (
    <View>
      <Text>Promo Board Config Editor</Text>
    </View>
  );
};