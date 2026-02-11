import { Schema, model, Types } from "mongoose";

export type Column = "todo" | "in_progress" | "done";

export type CardDoc = {
    _id: Types.ObjectId;
    boardId: string;
    column: Column;
    title: string;
    description?: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
};

const cardSchema = new Schema<CardDoc>(
    {
        boardId: { type: String, required: true, index: true },
        column: {
            type: String,
            required: true,
            enum: ["todo", "in_progress", "done"],
            index: true,
        },
        title: { type: String, required: true, trim: true },
        description: { type: String, default: "" },
        order: { type: Number, required: true, index: true },
    },
    { timestamps: true },
);

cardSchema.index({ boardId: 1, column: 1, order: 1 });

export const Card = model<CardDoc>("Card", cardSchema);
