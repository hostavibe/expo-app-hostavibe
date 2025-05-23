import { z } from "zod";


export const GridDimensionIdSchema = z.string().brand("GridDimensionId");
export type GridDimensionId = z.infer<typeof GridDimensionIdSchema>;


export const GridDimensionOptionSchema = z.object({
  id: GridDimensionIdSchema,
  label: z.string(),
  rowCount: z.number().positive().int(),
  columnCount: z.number().positive().int(),
});
export type GridDimensionOption = z.infer<typeof GridDimensionOptionSchema>;


// export const AllGridDimensionOptionsSchema = z.record(GridDimensionIdOptionsEnum, GridDimensionOptionSchema);
// export type AllGridDimensionOptions = z.infer<typeof AllGridDimensionOptionsSchema>;

export const GRID_DIMENSION_OPTIONS: GridDimensionOption[] = [
  { id: "1x1" as GridDimensionId, label: "1×1 Grid (1 screen)", rowCount: 1, columnCount: 1 },
  { id: "1x2" as GridDimensionId, label: "1×2 Grid (2 screens, side by side)", rowCount: 1, columnCount: 2 },
  { id: "2x1" as GridDimensionId, label: "2×1 Grid (2 screens, one above the other)", rowCount: 2, columnCount: 1 },
  { id: "2x2" as GridDimensionId, label: "2×2 Grid (4 screens)", rowCount: 2, columnCount: 2 },
] as const satisfies GridDimensionOption[];




  
export const GridDimensionIdOptionsEnum = z.enum([
  "1x1",
  "1x2",
  "2x1",
  "2x2",
]).brand("GridDimensionId");
export type GridDimensionIdOptions = z.infer<typeof GridDimensionIdOptionsEnum>;


// export const GridDimensions = z.record(GridDimensionIdSchema, GridDimensionOptionSchema);
// export type GridDimensions = z.infer<typeof GridDimensions>;


// export const GRID_DIMENSION_OPTIONS = z.enum([
//   "1x1",
//   "1x2",
//   "2x1",
//   "2x2",
// ]);



// // Base configuration that defines all possible grid dimensions
// export type GRID_DIMENSION_CONFIGS = [
//   { id: "1x1", label: "1×1 Grid (1 screen)", rowCount: 1, columnCount: 1 },
//   { id: "1x2", label: "1×2 Grid (2 screens, side by side)", rowCount: 1, columnCount: 2 },
//   { id: "2x1", label: "2×1 Grid (2 screens, one above the other)", rowCount: 2, columnCount: 1 },
//   { id: "2x2", label: "2×2 Grid (4 screens)", rowCount: 2, columnCount: 2 },
// ];

// export type GridDimensionConfig = typeof GRID_DIMENSION_CONFIGS[number];

// const createExtension = (config: GridDimensionConfig) => {
//   return GridDimensionOptionSchema.extend({
//     id: z.literal(config.id).brand("GridDimensionId"),
//     label: z.literal(config.label),
//     rowCount: z.literal(config.rowCount),
//     columnCount: z.literal(config.columnCount),
//   });
// }

// // Create the enum schema using the config
// const GRID_DIMENSION_OPTIONS = [
//   // createExtension(GRID_DIMENSION_CONFIGS[0]),
//   // createExtension(GRID_DIMENSION_CONFIGS[1]),
//   // createExtension(GRID_DIMENSION_CONFIGS[2]),
//   // createExtension(GRID_DIMENSION_CONFIGS[3]),
//   ...GRID_DIMENSION_CONFIGS.map(createExtension),
// ] as const;

//   GridDimensionOptionSchema.extend({
//     id: z.literal("2x1").brand("GridDimensionId"),
//     label: z.literal("2×1 Grid (2 screens, one above the other)"),
//     rowCount: z.literal(2),
//     columnCount: z.literal(1),
//   }),
//   GridDimensionOptionSchema.extend({
//     id: z.literal("2x2").brand("GridDimensionId"),
//     label: z.literal("2×2 Grid (4 screens)"),
//     rowCount: z.literal(2),
//     columnCount: z.literal(2),
//   }),
// ] as const;

// export const GridDimensionsEnumSchema = z.discriminatedUnion([...GRID_DIMENSION_OPTIONS]);

// export type GridDimensionsEnum = z.infer<typeof GridDimensionsEnumSchema>;
// export type GridDimensionsOption = z.infer<typeof GridDimensionsEnumSchema>;

// Original enum schema for backward compatibility
// export const FzbBoardGridDimensionsSchema = GridDimensionsEnumSchema;
// export type FzbBoardGridDimensions = GridDimensionsEnum;

// Helper function to get a grid dimension option by ID
// export const getGridDimensionOption = (id: GridDimensionsEnum): GridDimensionConfig => {
//   return GRID_DIMENSION_CONFIGS.find(opt => opt.id === (id as { id: string }).id)!;
// }

// // Helper function to get all grid dimension options
// export const getAllGridDimensionOptions = (): GridDimensionsOption[] => {
//   return [...GRID_DIMENSION_CONFIGS];
// }
