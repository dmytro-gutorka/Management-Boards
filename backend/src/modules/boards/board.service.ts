import { nanoid } from "nanoid";
import { Board } from "./board.model";
import { HttpError } from "../../common/HttpErrors";
import { Card } from "../cards/card.model";


class BoardService {
    async createBoard(name: string) {
        const boardId = nanoid(10);
        const board = await Board.create({ boardId, name });

        return { boardId: board.boardId, name: board.name };
    }

    async getBoard(boardId: string) {
        const board = await Board.findOne({ boardId }).lean();

        if (!board) throw HttpError.notFound("Board not found");

        return { boardId: board.boardId, name: board.name };
    }

    async updateBoard(boardId: string, name: string) {
        const board = await Board.findOneAndUpdate({ boardId }, { name }, { new: true }).lean();

        if (!board) throw HttpError.notFound("Board not found");

        return { boardId: board.boardId, name: board.name };
    }

    async deleteBoard(boardId: string) {
        const board = await Board.findOneAndDelete({ boardId }).lean();

        if (!board) throw HttpError.notFound("Board not found");

        await Card.deleteMany({ boardId });

        return { deleted: true };
    }
}

export const boardService = new BoardService();
