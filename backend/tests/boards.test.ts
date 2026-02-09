import request from 'supertest';
import { createApp } from '../src/app';
// @ts-ignore
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


test('create/get board', async () => {
    const created = await request(app).post('/api/v1/boards').send({ name: 'My board' }).expect(201);
    expect(created.body.data.boardId).toBeTruthy();

    const boardId = created.body.data.boardId;
    const fetched = await request(app).get(`/api/v1/boards/${boardId}`).expect(200);
    expect(fetched.body.data.name).toBe('My board');
});
