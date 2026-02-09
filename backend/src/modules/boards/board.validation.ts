import { z } from 'zod';

export const createBoardSchema = z.object({
    name: z.string().min(1).max(80),
});

export const updateBoardSchema = z.object({
    name: z.string().min(1).max(80),
});
