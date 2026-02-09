import { z } from 'zod';

export const columnSchema = z.enum(['todo', 'in_progress', 'done']);


export const createCardSchema = z.object({
    title: z.string().min(1).max(120),
    description: z.string().max(2000).optional(),
    column: columnSchema.optional().default('todo'),
});

export const updateCardSchema = z.object({
    title: z.string().min(1).max(120).optional(),
    description: z.string().max(2000).optional(),
    column: columnSchema.optional(),
    order: z.number().int().min(0).optional(),
});

export const reorderSchema = z.object({
    columns: z.object({
        todo: z.array(z.string().min(1)),
        in_progress: z.array(z.string().min(1)),
        done: z.array(z.string().min(1)),
    }),
});
