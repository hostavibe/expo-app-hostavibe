import { ThemedText } from "@/src/components/ThemedText";
import { BOARD_TYPE_GRID_SCREEN, FzbBoardGridScreen } from "@/src/zod-types/boards/board-types/fzb-board-grid-screen";
import { GRID_DIMENSION_OPTIONS, GridDimensionOption } from "@/src/zod-types/boards/grid-dimensions";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Pressable, View } from "react-native";


interface GridScreenBoardConfigEditorProps {
  boardConfig: FzbBoardGridScreen;
  styles: any;
  setActiveBoardConfig: (updatedBoardConfig: FzbBoardGridScreen) => Promise<void>;
}

export const GridScreenBoardConfigEditor = ({ boardConfig, styles, setActiveBoardConfig }: GridScreenBoardConfigEditorProps) => {
  // const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [selectedGrid, setSelectedGrid] = useState<GridDimensionOption | null>(
    GRID_DIMENSION_OPTIONS.find(opt => opt.id === boardConfig.gridDimensionsId) || null
  );
  const [selectedCell, setSelectedCell] = useState<string | null>(null);

  const activeBoardType = boardConfig.boardType;

  const handleGridChange = async (gridOption: GridDimensionOption) => {
    setSelectedGrid(gridOption);

    const updatedGridBoardConfig: FzbBoardGridScreen = {
      boardType: BOARD_TYPE_GRID_SCREEN,
      gridDimensionsId: gridOption.id,
      allScreenSettings: Array(gridOption.rowCount * gridOption.columnCount).fill({
        screenType: 'show-permanent-blank',
      }),
    }

    await setActiveBoardConfig(updatedGridBoardConfig);
  };

  // Helper function to get Excel-style cell reference
  const getCellReference = (row: number, col: number) => {
    const colLetter = String.fromCharCode(64 + col); // A = 65 in ASCII
    return `${colLetter}${row}`;
  };

  // const handleGridChange = (gridOption: GridDimensionOption) => {
  //   console.log('handleGridChange', gridOption);
  // }

  // const getCellReference = (row: number, col: number) => {
  //   const colLetter = String.fromCharCode(64 + col);
  //   return `${colLetter}${row}`;
  // };

  return (
    <View>
      <ThemedText>Grid Screen Board Config Editor</ThemedText>

      {activeBoardType === BOARD_TYPE_GRID_SCREEN && selectedGrid && (
            <>
              <View style={styles.gridSettingsContainer}>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={selectedGrid.id}
                    onValueChange={(value) => {
                      const option = GRID_DIMENSION_OPTIONS.find(opt => opt.id === value);
                      if (option) {
                        handleGridChange(option);
                      }
                    }}
                    style={styles.picker}
                  >
                    {GRID_DIMENSION_OPTIONS.map((option) => (
                      <Picker.Item
                        key={option.id}
                        label={option.label}
                        value={option.id}
                      />
                    ))}
                  </Picker>
                </View>
              </View>

              <View style={styles.gridContainer}>
                {Array.from({ length: selectedGrid.rowCount }).map((_, rowIndex) => (
                  <View key={rowIndex} style={styles.gridRow}>
                    {Array.from({ length: selectedGrid.columnCount }).map((_, colIndex) => {
                      const cellRef = getCellReference(rowIndex + 1, colIndex + 1);
                      return (
                        <Pressable
                          key={colIndex}
                          style={[
                            styles.gridCell,
                            selectedCell === cellRef && styles.selectedCell
                          ]}
                          onPress={() => setSelectedCell(cellRef)}
                        >
                          <ThemedText style={styles.cellText}>{cellRef}</ThemedText>
                        </Pressable>
                      );
                    })}
                  </View>
                ))}
              </View>

              {selectedCell && (
                <View style={styles.cellDetailsContainer}>
                  <ThemedText style={styles.cellDetailsTitle}>Cell Details</ThemedText>
                  <ThemedText style={styles.cellDetailsText}>Selected: {selectedCell}</ThemedText>
                </View>
              )}
            </>
          )}
    </View>
  );
}; 