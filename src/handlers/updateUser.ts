import cluster from 'node:cluster';

import { UserService } from '../UserService.js';
import { STATUS_CODES } from '../constants.js';

import { getRequestBody, makeResponse } from './utils.js';
import { gettingUser } from './common.js';


export const updateUser = (request, response) => {
    const user = gettingUser(request, response);

    if (!user) {
        return;
    }

    getRequestBody(request, (userData) => {
        const { username, age, hobbies } = JSON.parse(userData);

        if (!UserService.getIsValidUserData({ username, age, hobbies })) {
            makeResponse(response, STATUS_CODES.INVALID, { message: 'Incorrect user data' });

            return;
        }

        Object.assign(user, { username, age, hobbies });

        if (cluster.isWorker) {
            process.send(UserService.getUsers());
        }

        makeResponse(response, STATUS_CODES.SUCCESS, { user });
    });
};
