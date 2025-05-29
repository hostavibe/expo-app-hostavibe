import { BoardConfigEditor } from '@/src/components/boards/board-config-editor/board-config-editor';
import { useUserBoardsScreenContext } from '@/src/components/boards/boards-overview/user-boards-screen-context';
import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';
import { IconSymbol } from '@/src/components/ui/IconSymbol';
import { FzbBoardDefaultConfigurations } from '@/src/zod-types/boards/board-types/fzb-board-defaults';
import { BOARD_TYPE_OPTIONS, FzbBoardTypes } from '@/src/zod-types/boards/board-types/fzb-board-types';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 32,
    alignItems: 'center',
  },
  contentContainer: {
    width: 400,
    maxWidth: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 24,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    flex: 1,
  },
  description: {
    fontSize: 16,
    opacity: 0.8,
    flex: 1,
  },
  input: {
    fontSize: 24,
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
  },
  descriptionInput: {
    fontSize: 16,
    minHeight: 60,
  },
  editButton: {
    padding: 4,
  },
  configInfo: {
    gap: 8,
  },
  error: {
    color: '#ff4444',
    fontSize: 16,
  },
  gridSettingsContainer: {
    marginBottom: 24,
  },
  gridSettingsLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    overflow: 'hidden',
  },
  picker: {
    height: 40,
  },
  gridContainer: {
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    overflow: 'hidden',
    width: 200,
    alignSelf: 'center',
  },
  gridRow: {
    flexDirection: 'row',
  },
  gridCell: {
    flex: 1,
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    minWidth: 50,
    minHeight: 50,
  },
  selectedCell: {
    backgroundColor: '#e3f2fd',
  },
  cellText: {
    fontSize: 14,
  },
  cellDetailsContainer: {
    marginBottom: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#f5f5f5',
  },
  cellDetailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cellDetailsText: {
    fontSize: 16,
  },
  boardTypeContainer: {
    marginBottom: 24,
  },
  boardTypeLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
});


export const BoardSetupScreen = () => {
  // const localSearchParams = useLocalSearchParams();

  // const { boardUuid } = convertIdSearchParamToBoardIds(localSearchParams);

  
  const {
    // setBoardIdentity,
    isLoading,
    currentBoardSetup,
    updateCurrentBoardSetup,
    error,
  } = useUserBoardsScreenContext();
  
  const [editingName, setEditingName] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  
  const activeBoardConfig = currentBoardSetup?.configuration_json;
  const activeBoardType = activeBoardConfig?.boardType;

  const boardName = currentBoardSetup?.name;
  const boardDescription = currentBoardSetup?.description;

  
  if (isLoading || !currentBoardSetup) {
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }


  const handleBoardTypeChange = async (boardType: FzbBoardTypes['boardType']) => {
    const defaultConfig = FzbBoardDefaultConfigurations[boardType];
    
    const now = new Date().toISOString();

    try {
      updateCurrentBoardSetup({
        ...currentBoardSetup,
        configuration_json: defaultConfig,
        updated_at: now,
      });
    } catch (err) {
      setLocalError('Error updating board type');
      console.error('Error updating board type:', err);
    }
  };


  if (error || localError || !activeBoardConfig) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.error}>{error || localError || 'Board not found'}</ThemedText>
      </ThemedView>
    );
  }

  // const saveUpdatedBoardConfig = async (updatedBoardConfig: FzbBoardTypes) => {
  //   try {
  //     const { error: updateError } = await supabase
  //       .from('board_configurations')
  //       .update({ configuration_json: updatedBoardConfig })
  //       .eq('id', boardUuid);

  //     if (updateError) throw updateError;
  //     setActiveBoardConfig(updatedBoardConfig);
  //     setHasUnsavedChanges(true);
  //   } catch (err) {
  //     console.error('Error updating board config:', err);
  //   }
  // };

  const setActiveBoardConfig = async (updatedBoardConfig: FzbBoardTypes) => {
    updateCurrentBoardSetup({
      ...currentBoardSetup,
      configuration_json: updatedBoardConfig,
    });
  };


  return (
    <ThemedView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            {editingName ? (
              <TextInput
                style={styles.input}
                value={boardName}
                onChangeText={(text) => {
                  updateCurrentBoardSetup({
                    ...currentBoardSetup,
                    name: text,
                  });
                  // setDirty();
                }}
                onBlur={() => {
                  setEditingName(false);
                }}
                autoFocus
              />
            ) : (
              <ThemedText type="title" style={styles.title}>{boardName}</ThemedText>
            )}
            <Pressable onPress={() => setEditingName(true)} style={styles.editButton}>
              <IconSymbol name="pencil.circle" size={20} color="#666" />
            </Pressable>
          </View>

          <View style={styles.descriptionContainer}>
            {editingDescription ? (
              <TextInput
                style={[styles.input, styles.descriptionInput]}
                value={boardDescription || ''}
                onChangeText={(text) => {
                  updateCurrentBoardSetup({
                    ...currentBoardSetup,
                    description: text,
                  });
                  // setDirty();
                }}
                onBlur={() => {
                  setEditingDescription(false);
                }}
                multiline
                autoFocus
              />
            ) : (
              <ThemedText style={styles.description}>{boardDescription}</ThemedText>
            )}
            <Pressable onPress={() => setEditingDescription(true)} style={styles.editButton}>
              <IconSymbol name="pencil.circle" size={20} color="#666" />
            </Pressable>
          </View>

          <View style={styles.boardTypeContainer}>
            <ThemedText style={styles.boardTypeLabel}>Board Type:</ThemedText>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={activeBoardType}
                onValueChange={handleBoardTypeChange}
                style={styles.picker}
              >
                {Object.entries(BOARD_TYPE_OPTIONS).map(([value, label]) => (
                  <Picker.Item
                    key={value}
                    label={label}
                    value={value}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <BoardConfigEditor
            boardConfig={activeBoardConfig}
            styles={styles}
            setActiveBoardConfig={setActiveBoardConfig}
          />
        </View>
      </ScrollView>
    </ThemedView>
  );
};

// export const BoardSetupScreenPage = () => {
//   return (
//     <SaveBoardSetupContextProvider>
//       {/* <BoardSetupScreen /> */}
//       <Stack.Screen
//         name="[id]"
//         options={{
//           title: 'Board Details',
//           headerRight: () => (
//             <Pressable
//               style={({ pressed }) => ({
//                 opacity: pressed ? 0.7 : 1,
//                 padding: 8,
//               })}
//             >
//               <ThemedText style={{ color: '#007AFF' }}>Save</ThemedText>
//             </Pressable>
//           ),
//         }}
//       />

//     </SaveBoardSetupContextProvider>
//   );
// }


export default BoardSetupScreen; 
