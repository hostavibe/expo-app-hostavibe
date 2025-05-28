import { FzbScreenId } from "@/zod-types/branded-strings/fb-branded-strings";
import { FzbPostData } from "@/zod-types/posts/fzb-post";
import { SCREEN_CONFIG_TYPE_POSTER_PLACED_SCREEN_IMAGE } from "@/zod-types/screen-config/fzb-poster-placed-screen-image";
import { FzbScreenConfigData } from "@/zod-types/screen-config/fzb-screen-config";
import { useState } from "react";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import { ScreenDataRenderer } from "../../post-types/screen-data-renderer";


export interface Dimensions {
  width: number;
  height: number;
}

interface ScreenContentComponentProps {
  screenId: FzbScreenId;
  screenPostData: FzbPostData | null;
  gridCoordinate: string;
  sendPostToScreenUrl: string;
  screenConfig: FzbScreenConfigData;
}

export const ScreenContentPosterPlacedScreenImage = ({ 
  screenId,
  screenPostData, 
  gridCoordinate, 
  sendPostToScreenUrl,
  screenConfig,
}: ScreenContentComponentProps) => {

  const [dimensions, setDimensions] = useState<Dimensions | null>(null);
  
  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setDimensions({ width, height });
  };

  if (screenConfig.screenType !== SCREEN_CONFIG_TYPE_POSTER_PLACED_SCREEN_IMAGE) {
    return null;
  }

  return (
    <View
      key={screenId}
      style={styles.container}
      onLayout={handleLayout}
    >
      <ScreenDataRenderer
        postedData={screenPostData}
        screenConfig={screenConfig}
        dimensions={dimensions}
        sendPostToScreenUrl={sendPostToScreenUrl}
        gridCoordinate={gridCoordinate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#000',
    flexDirection: 'column',
    gap: 4, // React Native uses numbers for gap
    // Note: elevation is not directly supported in React Native
    // You might want to use shadowProps for iOS or elevation for Android
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // for Android
  },
});
