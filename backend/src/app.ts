import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { notFound } from "./middlewares/notFound.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";

export function createApp() {
    const app = express();

    app.use(helmet());
    app.use(cors());
    app.use(express.json());

    app.use(morgan("dev"));

    app.get("/health", (_req, res) => res.json({ ok: true }));

    app.use("/api/boards", "boardRoutes"); // TODO 1: replace with relevant boardRoutes
    app.use("/api/boards/:boardId/cards", "cardRoutes"); // TODO 2: replace with relevant cardRoutes

    app.use(notFound);
    app.use(errorMiddleware);

    return app;
}
