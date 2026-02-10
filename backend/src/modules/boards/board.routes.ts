import { Router } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler.middleware";
import { boardController } from "./board.controller";


export const boardRoutes = Router();


boardRoutes.get("/:boardId", asyncHandler(boardController.getBoard));
boardRoutes.get('/', asyncHandler(boardController.listBoards));
boardRoutes.post("/", asyncHandler(boardController.createBoard));
boardRoutes.patch("/:boardId", asyncHandler(boardController.updateBoard));
boardRoutes.delete("/:boardId", asyncHandler(boardController.deleteBoard));