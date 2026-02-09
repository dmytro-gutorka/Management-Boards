import { Types } from 'mongoose';
import { Board } from '../boards/board.model';
import { Card, Column } from './card.model';
import { HttpError } from "../../common/HttpErrors";
import { toDto } from "./card.mappers";


export class CardService {

    private async ensureBoard(boardId: string) {
        const board = await Board.findOne({ boardId }).lean();

        if (!board) throw HttpError.notFound('Board not found');
    }

    async list(boardId: string) {
        await this.ensureBoard(boardId);

        const cards = await Card.find({ boardId })
            .sort({ column: 1, order: 1, createdAt: 1 })
            .lean();

        return cards.map(toDto);
    }

    async create(boardId: string, input: { title: string; description?: string; column: Column }) {
        await this.ensureBoard(boardId);

        const last = await Card.findOne({ boardId, column: input.column }).sort({ order: -1 }).lean();
        const nextOrder = last ? last.order + 1 : 0;

        const card = await Card.create({
            boardId,
            column: input.column,
            title: input.title,
            description: input.description ?? '',
            order: nextOrder,
        });

        return toDto(card);
    }

    async update(
        boardId: string,
        cardId: string,
        patch: Partial<{ title: string; description: string; column: Column; order: number }>,
    ) {
        await this.ensureBoard(boardId);

        if (!Types.ObjectId.isValid(cardId)) throw HttpError.badRequest('Invalid cardId');

        const card = await Card.findOneAndUpdate({ _id: cardId, boardId }, patch, { new: true }).lean();

        if (!card) throw HttpError.notFound('Card not found');

        return toDto(card);
    }

    async delete(boardId: string, cardId: string) {
        await this.ensureBoard(boardId);

        if (!Types.ObjectId.isValid(cardId)) throw HttpError.badRequest('Invalid cardId');

        const card = await Card.findOneAndDelete({ _id: cardId, boardId }).lean();

        if (!card) throw HttpError.notFound('Card not found');

        return { deleted: true };
    }

    async reorder(
        boardId: string,
        columns: { todo: string[]; in_progress: string[]; done: string[] },
    ) {
        await this.ensureBoard(boardId);

        const allIds = [...columns.todo, ...columns.in_progress, ...columns.done];

        if (allIds.length === 0) return { ok: true };

        const uniq = new Set(allIds);

        if (uniq.size !== allIds.length) {
            throw HttpError.badRequest('Duplicate card ids in reorder payload');
        }

        for (const id of allIds) {
            if (!Types.ObjectId.isValid(id)) throw HttpError.badRequest(`Invalid card id: ${id}`);
        }

        const objectIds = allIds.map((id) => new Types.ObjectId(id));

        const found = await Card.countDocuments({ boardId, _id: { $in: objectIds } });

        if (found !== allIds.length) throw HttpError.badRequest('Some cards not found in this board');

        const makeOps = (column: Column, ids: string[]) =>
            ids.map((id, idx) => ({
                updateOne: {
                    filter: { _id: id, boardId },
                    update: { $set: { column, order: idx } },
                },
            }));

        const ops = [
            ...makeOps('todo', columns.todo),
            ...makeOps('in_progress', columns.in_progress),
            ...makeOps('done', columns.done),
        ];

        await Card.bulkWrite(ops, { ordered: false });

        return { ok: true };
    }
}

export const cardService = new CardService();
