import { cardRoutes } from "./cards/card.routes";
import { boardRoutes } from "./boards/board.routes";
import { Router } from "express";

export const router = Router();

router.use("/boards", boardRoutes);
router.use("/boards/:boardId/cards", cardRoutes);
