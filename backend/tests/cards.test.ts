import request from "supertest";
import { createApp } from "../src/app";
import { clearTestDb, connectTestDb, disconnectTestDb } from "./db";

const app = createApp();

beforeAll(async () => {
    await connectTestDb();
});

beforeEach(async () => {
    await clearTestDb();
});

afterAll(async () => {
    await disconnectTestDb();
});

test("create cards + reorder", async () => {
    const b = await request(app).post("/api/v1/boards").send({ name: "B" }).expect(201);
    const boardId = b.body.data.boardId;

    const c1 = await request(app)
        .post(`/api/v1/boards/${boardId}/cards`)
        .send({ title: "A" })
        .expect(201);
    const c2 = await request(app)
        .post(`/api/v1/boards/${boardId}/cards`)
        .send({ title: "B" })
        .expect(201);

    const id1 = c1.body.data.id;
    const id2 = c2.body.data.id;

    await request(app)
        .put(`/api/v1/boards/${boardId}/cards/reorder`)
        .send({
            columns: {
                todo: [id2, id1],
                in_progress: [],
                done: [],
            },
        })
        .expect(200);

    const list = await request(app).get(`/api/v1/boards/${boardId}/cards`).expect(200);
    expect(list.body.data[0].id).toBe(id2);
    expect(list.body.data[0].order).toBe(0);
});
