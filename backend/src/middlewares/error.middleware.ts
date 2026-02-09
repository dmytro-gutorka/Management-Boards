import type {NextFunction, Request, Response} from 'express';
import {HttpError} from "../common/HttpErrors";


export function errorMiddleware(err: unknown, _req: Request, res: Response, _next: NextFunction) {
    if (err instanceof HttpError) {
        return res.status(err.errorStatusCode).json({error: err.errorMessage});
    }

    if (err instanceof Error) {
        return res.status(500).json({error: err.message});
    }

    return res.status(500).json({error: 'Unknown error'});
}
