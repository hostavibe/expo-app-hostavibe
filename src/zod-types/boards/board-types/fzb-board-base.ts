import { BoardIdSchema } from "@/src/zod-types/branded-strings/board-id";
import { z } from "zod";


export const FzbBoardBaseSchema = z.object({
  id: BoardIdSchema,
});

export type FzbBoardBase = z.infer<typeof FzbBoardBaseSchema>;
