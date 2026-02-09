import dotenv from 'dotenv';
import {defaultMongoDbUri, defaultNodeEnv, defaultServerPort} from "../constants/env.default.constants";

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV ?? defaultNodeEnv.development,
  port: Number(process.env.PORT ?? defaultServerPort),
  mongoUri: process.env.MONGO_URI ?? defaultMongoDbUri,
};
