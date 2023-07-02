import { UserDB } from '../userDb.ts';

import { STATUS_CODES } from '../constants.js';
import { getRequestBody, makeJsonResponse } from './utils.ts';

export const createUser = (request, response) => {
    getRequestBody(request, (userData) => {
        const { username, age, hobbies } = JSON.parse(userData);

        if (!UserDB.getIsValidUserData({ username, age, hobbies })) {
            makeJsonResponse(response, STATUS_CODES.INVALID, { message: 'Incorrect user data' });

            return;
        }

        const user = UserDB.createUser({ username, age, hobbies });

        makeJsonResponse(response, STATUS_CODES.CREATED, { user });
    });
};
