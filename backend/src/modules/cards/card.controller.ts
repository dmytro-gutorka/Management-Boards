import type { Request, Response } from "express";
import { createCardSchema, reorderSchema, updateCardSchema } from "./card.validation";
import { cardService } from "./card.service";


class CardController {
    list = async (req: Request, res: Response) => {
        const data = await cardService.list(req.params.boardId);

        res.status(200).json({ data });
    };

    create = async (req: Request, res: Response) => {
        const body = createCardSchema.parse(req.body);
        const data = await cardService.create(req.params.boardId, body);

        res.status(201).json({ data });
    };

    update = async (req: Request, res: Response) => {
        const body = updateCardSchema.parse(req.body);
        const data = await cardService.update(req.params.boardId, req.params.cardId, body);

        res.status(200).json({ data });
    };

    delete = async (req: Request, res: Response) => {
        const data = await cardService.delete(req.params.boardId, req.params.cardId);

        res.json({ data });
    };

    reorder = async (req: Request, res: Response) => {
        const body = reorderSchema.parse(req.body);
        const data = await cardService.reorder(req.params.boardId, body.columns);

        res.status(200).json({ data });
    };
}

export const cardController = new CardController();