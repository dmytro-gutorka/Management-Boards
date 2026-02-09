import { Schema, model } from "mongoose";

export type BoardDoc = {
    boardId: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
};

const boardSchema = new Schema<BoardDoc>(
    {
        boardId: { type: String, required: true, unique: true, index: true },
        name: { type: String, required: true, trim: true },
    },
    { timestamps: true },
);

export const Board = model<BoardDoc>("Board", boardSchema);
