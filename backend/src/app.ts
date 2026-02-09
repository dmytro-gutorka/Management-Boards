import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { notFound } from "./middlewares/notFound.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";
import { router } from "./modules";


export function createApp() {
    const app = express();

    app.use(helmet());
    app.use(cors());
    app.use(express.json());

    app.use(morgan("dev"));

    app.use('/api/v1', router)

    app.use(notFound);
    app.use(errorMiddleware);

    return app;
}
