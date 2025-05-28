import { createSendPostToScreenUrl } from "@/app/url-utils";
import { getGridCoordinate } from "@/app/utils";
import { FzbScreenConfigData } from "@/src/zod-types/screen-config/fzb-screen-config";
import { ScreenPost } from "@/src/zod-types/screen-post";
import { MaterialIcons } from '@expo/vector-icons';
import React from "react";
import { Pressable, StyleSheet, View } from 'react-native';
import { ScreenContentComponent } from "../screen-content/ScreenContentComponent";


interface IconButtonProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  size?: number;
  color?: string;
  onPress?: () => void;
  style?: any;
}

const IconButton = ({ 
  icon, 
  size = 24, 
  color = '#000', 
  onPress,
  style 
}: IconButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        style
      ]}
    >
      <MaterialIcons name={icon} size={size} color={color} />
    </Pressable>
  );
};


interface BoardComponentProps {
  rowCount: number;
  columnCount: number;

  screenPosts: ScreenPost[];
  allScreenSettings: FzbScreenConfigData[],
  
  isFullscreen: boolean;
  onRequestFullscreen: () => void;
  onBackToBoardSetupPage: () => void;
  onBackToBoardsPage: () => void;
}

export const BoardComponent = ({ 
  rowCount, 
  columnCount,
    
  screenPosts,
  allScreenSettings,
  isFullscreen,
  onRequestFullscreen,
  onBackToBoardSetupPage,
  onBackToBoardsPage,
}: BoardComponentProps) => {

  const showGoFullscreenButton = !isFullscreen;

  const expectedScreenCount = rowCount * columnCount;
  if (screenPosts.length !== expectedScreenCount) {
    console.error(`Expected ${expectedScreenCount} screens, but got ${screenPosts.length} [${rowCount}x${columnCount}]`);
    throw new Error(`Expected ${expectedScreenCount} screens, but got ${screenPosts.length} [${rowCount}x${columnCount}]`);
  }

  return (
    <View style={styles.container}>
      {showGoFullscreenButton &&
        <>
          <IconButton
            icon="arrow-back"
            size={24}
            color="#000"
            onPress={onBackToBoardSetupPage}
            style={styles.backToBoardSetupButton}
          />
          <IconButton
            icon="arrow-upward"
            size={24}
            color="#000"
            onPress={onBackToBoardsPage}
            style={styles.backToBoardsButton}
          />
          <IconButton
            icon="fullscreen"
            size={24}
            color="#000"
            onPress={onRequestFullscreen}
            style={styles.fullscreenButton}
          />
        </>
      }
      
      {Array.from({ length: rowCount }).map((_, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.row}>
          {Array.from({ length: columnCount }).map((_, colIndex) => {
            const screenIndex = rowIndex * columnCount + colIndex;
            const { screenId, postData } = screenPosts[screenIndex];

            const gridCoordinate = getGridCoordinate(rowIndex, colIndex);
            const sendPostToScreenUrl = createSendPostToScreenUrl(screenId);

            const screenSettings = allScreenSettings[screenIndex];
            
            return (
              <View key={screenId} style={styles.cell}>
                <ScreenContentComponent
                  dimensions={null}
                  screenId={screenId}
                  screenPostData={postData}
                  gridCoordinate={gridCoordinate}
                  sendPostToScreenUrl={sendPostToScreenUrl}
                  screenConfig={screenSettings}
                />
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
    overflow: 'hidden',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
  },
  backToBoardSetupButton: {
    position: 'absolute',
    top: 16,
    right: 96,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  backToBoardsButton: {
    position: 'absolute',
    top: 16,
    right: 56,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  fullscreenButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  button: {
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});
