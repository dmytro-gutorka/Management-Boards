import { CardDto } from "./card.types";

export function toDto(card: any): CardDto {
    return {
        id: String(card._id),
        boardId: card.boardId,
        column: card.column,
        title: card.title,
        description: card.description ?? "",
        order: card.order,
        createdAt: card.createdAt,
        updatedAt: card.updatedAt,
    };
}
