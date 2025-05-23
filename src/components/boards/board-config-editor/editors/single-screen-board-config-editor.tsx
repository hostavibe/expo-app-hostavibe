import { ScreenConfigEditor } from "@/src/components/boards/screen-config-editor";
import { ThemedText } from "@/src/components/ThemedText";
import { FzbBoardSingleScreen } from "@/src/zod-types/boards/board-types/fzb-board-single-screen";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet, View } from "react-native";

const SCREEN_TYPE_OPTIONS = [
  { id: 'show-permanent-blank' as const, label: 'Blank Screen' },
  { id: 'show-permanent-image-link' as const, label: 'Image Link' },
  { id: 'show-permanent-pdf-link' as const, label: 'PDF' },
  { id: 'show-permanent-iframe-link' as const, label: 'iFrame' },
  { id: 'show-image-from-my-posts' as const, label: 'Image from My Posts' },
  { id: 'poster-placed-screen-image' as const, label: 'Poster Placed Image' },
  { id: 'poster-invitation-add-image-to-board-image-pool' as const, label: 'Add Image to Pool' },
  { id: 'show-promo' as const, label: 'Promo' },
] as const;

type ScreenType = typeof SCREEN_TYPE_OPTIONS[number]['id'];

interface SingleScreenBoardConfigEditorProps {
  boardConfig: FzbBoardSingleScreen;
  setActiveBoardConfig: (updatedBoardConfig: FzbBoardSingleScreen) => Promise<void>;
}

export const SingleScreenBoardConfigEditor = ({ boardConfig, setActiveBoardConfig }: SingleScreenBoardConfigEditorProps) => {
  const screenConfig = boardConfig.screenConfig;

  const handleScreenTypeChange = async (screenType: ScreenType) => {
    let newScreenConfig;
    
    switch (screenType) {
      case 'show-permanent-blank':
        newScreenConfig = { screenType };
        break;
      case 'show-permanent-image-link':
        newScreenConfig = { 
          screenType,
          imageUrl: '',
          backgroundColor: '#ffffff'
        };
        break;
      case 'show-permanent-pdf-link':
        newScreenConfig = { 
          screenType,
          pdfUrl: '',
          backgroundColor: '#ffffff'
        };
        break;
      case 'show-permanent-iframe-link':
        newScreenConfig = { 
          screenType,
          iframeUrl: '',
          backgroundColor: '#ffffff'
        };
        break;
      case 'show-image-from-my-posts':
        newScreenConfig = { screenType };
        break;
      case 'poster-placed-screen-image':
        newScreenConfig = { screenType };
        break;
      case 'poster-invitation-add-image-to-board-image-pool':
        newScreenConfig = { screenType };
        break;
      case 'show-promo':
        newScreenConfig = { screenType };
        break;
    }

    const updatedConfig: FzbBoardSingleScreen = {
      ...boardConfig,
      screenConfig: newScreenConfig,
    };
    await setActiveBoardConfig(updatedConfig);
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <ThemedText style={styles.screenTypeLabel}>Screen Type:</ThemedText>
        <Picker
          selectedValue={screenConfig.screenType}
          onValueChange={handleScreenTypeChange}
          style={styles.picker}
        >
          {SCREEN_TYPE_OPTIONS.map((option) => (
            <Picker.Item
              key={option.id}
              label={option.label}
              value={option.id}
            />
          ))}
        </Picker>
      </View>
      <ScreenConfigEditor screenConfig={screenConfig} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 16,
  },
  pickerContainer: {
    marginBottom: 16,
    // borderWidth: 1,
    // borderColor: '#ccc',
    // borderRadius: 8,
  },
  picker: {
    height: 50,
  },
  screenTypeLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
