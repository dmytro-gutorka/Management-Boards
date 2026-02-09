import { Router } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler.middleware";
import { cardController } from "./card.controller";


export const cardRoutes = Router({ mergeParams: true });

cardRoutes.get("/", asyncHandler(cardController.list));
cardRoutes.post("/", asyncHandler(cardController.create));
cardRoutes.put("/reorder", asyncHandler(cardController.reorder));
cardRoutes.patch("/:cardId", asyncHandler(cardController.update));
cardRoutes.delete("/:cardId", asyncHandler(cardController.delete));