import type { NextFunction, Request, Response } from "express";
import { HttpError } from "../common/HttpErrors";
import { ZodError } from "zod";

export function errorMiddleware(err: unknown, _req: Request, res: Response, _next: NextFunction) {
    if (err instanceof ZodError) {
        return res.status(400).json({
            error: "Validation error",
            details: err.issues.map((zodIssue) => ({
                path: zodIssue.path.join("."),
                message: zodIssue.message,
            })),
        });
    }

    if (err instanceof HttpError) {
        return res.status(err.errorStatusCode).json({ error: err.errorMessage });
    }

    if (err instanceof Error) {
        return res.status(500).json({ error: err.message });
    }

    return res.status(500).json({ error: "Unknown error" });
}
