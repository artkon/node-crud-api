import cluster from 'node:cluster';

import { UserService } from '../UserService.js';
import { STATUS_CODES } from '../constants.js';

import { getRequestBody, makeResponse } from './utils.js';


export const createUser = (request, response) => {
    getRequestBody(request, (userData) => {
        const { username, age, hobbies } = JSON.parse(userData);

        if (!UserService.getIsValidUserData({ username, age, hobbies })) {
            makeResponse(response, STATUS_CODES.INVALID, { message: 'Incorrect user data' });

            return;
        }

        const user = UserService.createUser({ username, age, hobbies });

        if (cluster.isWorker) {
            process.send(UserService.getUsers());
        }

        makeResponse(response, STATUS_CODES.CREATED, { user });
    });
};
