import { UserService } from '../UserService.ts';

import { STATUS_CODES } from '../constants.ts';
import { getRequestBody, makeResponse } from './utils.ts';

export const createUser = (request, response) => {
    getRequestBody(request, (userData) => {
        const { username, age, hobbies } = JSON.parse(userData);

        if (!UserService.getIsValidUserData({ username, age, hobbies })) {
            makeResponse(response, STATUS_CODES.INVALID, { message: 'Incorrect user data' });

            return;
        }

        const user = UserService.createUser({ username, age, hobbies });

        makeResponse(response, STATUS_CODES.CREATED, { user });
    });
};
