import mongoose from "mongoose";

export async function connectTestDb() {
    const uri = process.env.TEST_MONGO_URI;

    if (!uri) throw new Error("TEST_MONGO_URI is not set");

    await mongoose.connect(uri);
}

export async function clearTestDb() {
    if (mongoose.connection.readyState === 1) {
        await mongoose.connection.db!.dropDatabase();
    }
}

export async function disconnectTestDb() {
    if (mongoose.connection.readyState === 1) {
        await mongoose.disconnect();
    }
}
