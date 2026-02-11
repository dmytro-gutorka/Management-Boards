import { Column } from "./card.model";

export type CardDto = {
    id: string;
    boardId: string;
    column: Column;
    title: string;
    description: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
};

export type BoardParams = { boardId: string };
export type CardParams = { boardId: string; cardId: string };
