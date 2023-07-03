import request from 'supertest';

import { server } from '../index.js';
import { API_USERS, STATUS_CODES } from '../constants.js';


const testUser = { username: 'Artem', age: 25, hobbies: ['js', 'nodejs'] };

afterAll((done: jest.DoneCallback): void => {
    server.close();
    done();
});

describe('Scenario 1: CRUD operation with correct data', () => {
    test('/api/users should return empty user list', async () => {
        const { status, body } = await request(server).get(API_USERS);

        expect(status).toBe(STATUS_CODES.SUCCESS);
        expect(body).toEqual({ users: [] });
    });

    test('Create a new user', async () => {
        const { status, body } = await request(server).post(API_USERS).send(testUser);

        expect(status).toBe(STATUS_CODES.CREATED);
        expect(body).toEqual({ user: { ...testUser, id: body.user.id } });

        const responseUsers = await request(server).get(API_USERS);

        expect(responseUsers.body.users).toHaveLength(1);
    });

    test('/api/users/%id should return user with %id%', async () => {
        const responseUsers = await request(server).get(API_USERS);
        const userId = responseUsers.body.users[0].id;

        const { status, body } = await request(server).get(`${API_USERS}/${userId}`);
        expect(status).toBe(STATUS_CODES.SUCCESS);
        expect(body.user).toMatchObject(testUser);
    });

    test('update user by id', async () => {
        const responseUsers = await request(server).get(API_USERS);
        const userId = responseUsers.body.users[0].id;

        const userData = { username: 'user', age: 12 };
        const { status, body } = await request(server).put(`${API_USERS}/${userId}`).send(userData);
        expect(status).toBe(STATUS_CODES.SUCCESS);
        expect(body.user).toMatchObject(userData);
    });

    test('delete user by id', async () => {
        const responseUsers = await request(server).get(API_USERS);
        const userId = responseUsers.body.users[0].id;

        const { status } = await request(server).delete(`${API_USERS}/${userId}`);
        expect(status).toBe(STATUS_CODES.DELETED);

        const { body } = await request(server).get(API_USERS);
        expect(body.users).toHaveLength(0);
    });
});


describe('Scenario 2: providing invalid data', () => {
    test('should return 400 for invalid userId', async () => {
        const invalidId = 123;
        const { status } = await request(server).get(`${API_USERS}/${invalidId}`);

        expect(status).toBe(STATUS_CODES.INVALID);
    });

    test('should return 400 on creating user with invalid username', async () => {
        const invalidUserData = { username: 123, age: 12 };
        const { status } = await request(server).post(API_USERS).send(invalidUserData);

        expect(status).toBe(STATUS_CODES.INVALID);
    });

    test('should return 400 on creating user with invalid age', async () => {
        const invalidUserData = { username: 'Artsem', age: '12' };
        const { status } = await request(server).post(API_USERS).send(invalidUserData);

        expect(status).toBe(STATUS_CODES.INVALID);
    });

    test('should return 400 on creating user with invalid hobbies', async () => {
        const invalidUserData = { username: 'Artsem', age: 12, hobbies: [1, 2, 3] };
        const { status } = await request(server).post(API_USERS).send(invalidUserData);

        expect(status).toBe(STATUS_CODES.INVALID);
    });

    test('should return 400 on updating user with invalid userData', async () => {
        const invalidUserData = { username: 'Artsem', age: '12' };
        const { status } = await request(server).post(API_USERS).send(invalidUserData);

        expect(status).toBe(STATUS_CODES.INVALID);
    });

    test('should return 400 on deleting user with invalid userId', async () => {
        const invalidId = '123';
        const { status } = await request(server).delete(`${API_USERS}/${invalidId}`);

        expect(status).toBe(STATUS_CODES.INVALID);
    });
});

describe('Scenario 3: providing non-existing data', () => {
    test('should return 404 for wrong endpoints', async () => {
        const { status } = await request(server).get('/');

        expect(status).toBe(STATUS_CODES.NOT_FOUND);
    });

    test('should return 404 when getting user with not existing userId', async () => {
        const nonExistingUserId = '7f19fe95-6519-4128-8b88-8226e17a1711';
        const { status } = await request(server).get(`${API_USERS}/${nonExistingUserId}`);

        expect(status).toBe(STATUS_CODES.NOT_FOUND);
    });

    test('should return 404 when updating user with not existing userId', async () => {
        const nonExistingUserId = '7f19fe95-6519-4128-8b88-8226e17a1711';
        const { status } = await request(server).put(`${API_USERS}/${nonExistingUserId}`).send(testUser);

        expect(status).toBe(STATUS_CODES.NOT_FOUND);
    });

    test('should return 404 when deleting user with not existing userId', async () => {
        const nonExistingUserId = '7f19fe95-6519-4128-8b88-8226e17a1711';
        const { status } = await request(server).delete(`${API_USERS}/${nonExistingUserId}`);

        expect(status).toBe(STATUS_CODES.NOT_FOUND);
    });
});
