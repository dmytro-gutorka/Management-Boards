import type { Request, Response, NextFunction } from "express";
import { createBoardSchema, updateBoardSchema } from "./board.validation";
import { boardService } from "./board.service";
import { BoardParams } from "./borad.types";


class BoardController {
    createBoard = async (req: Request<BoardParams>, res: Response, next: NextFunction) => {
        const body = createBoardSchema.parse(req.body);
        console.log(222)

        const data = await boardService.createBoard(body.name);

        res.status(201).json({ data });
    };

    getBoard = async (req: Request<BoardParams>, res: Response, next: NextFunction) => {
        const data = await boardService.getBoard(req.params.boardId);

        res.json({ data });
    };

    updateBoard = async (req: Request<BoardParams>, res: Response, next: NextFunction) => {
        const body = updateBoardSchema.parse(req.body);
        const data = await boardService.updateBoard(req.params.boardId, body.name);

        res.json({ data });
    };

    deleteBoard = async (req: Request<BoardParams>, res: Response, next: NextFunction) => {
        const data = await boardService.deleteBoard(req.params.boardId);
        res.json({ data });
    };
}

export const boardController = new BoardController();
