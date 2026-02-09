import {ErrorMessages} from "../enums/errorMessages.enum";

type HttpErrorNames = (typeof ErrorMessages)[keyof typeof ErrorMessages];

export class HttpError extends Error {
    public errorStatusCode: number;
    public errorName: HttpErrorNames;
    public errorMessage: string = ErrorMessages.generalError;
    public errorDetails?: unknown;

    constructor(
        errorStatusCode: number = 500,
        errorName: HttpErrorNames,
        errorMessage: string = ErrorMessages.generalError,
        errorDetails?: unknown,
    ) {
        super(errorName);
        this.errorStatusCode = errorStatusCode;
        this.errorName = errorName;
        this.errorMessage = errorMessage;
        this.errorDetails = errorDetails;

        this.name = this.constructor.name;
    }

    public static badRequest(errorMessage?: string, errorDetails?: unknown): HttpError {
        return new HttpError(400, ErrorMessages.badRequest, errorMessage, errorDetails);
    }

    public static forbidden(errorMessage?: string, errorDetails?: unknown): HttpError {
        return new HttpError(403, ErrorMessages.forbidden, errorMessage, errorDetails);
    }

    public static notFound(errorMessage?: string, errorDetails?: unknown): HttpError {
        return new HttpError(404, ErrorMessages.notFound, errorMessage, errorDetails);
    }

    public static conflict(errorMessage?: string, errorDetails?: unknown): HttpError {
        return new HttpError(409, ErrorMessages.conflict, errorMessage, errorDetails);
    }

    public static internalServerError(errorMessage?: string, errorDetails?: unknown): HttpError {
        return new HttpError(500, ErrorMessages.internalServerError, errorMessage, errorDetails);
    }
}