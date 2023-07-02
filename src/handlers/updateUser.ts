import { UserDB } from '../userDb.ts';
import { STATUS_CODES } from '../constants.ts';

import { getRequestBody, makeJsonResponse } from './utils.ts';
import { gettingUser } from './common.ts';


export const updateUser = (request, response) => {
    const user = gettingUser(request, response);

    if (!user) {
        return;
    }

    getRequestBody(request, (userData) => {
        const { username, age, hobbies } = JSON.parse(userData);

        if (!UserDB.getIsValidUserData({ username, age, hobbies })) {
            makeJsonResponse(response, STATUS_CODES.INVALID, { message: 'Incorrect user data' });

            return;
        }

        Object.assign(user, { username, age, hobbies });

        makeJsonResponse(response, STATUS_CODES.SUCCESS, { user });
    });
};
