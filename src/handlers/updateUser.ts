import { UserService } from '../UserService.ts';
import { STATUS_CODES } from '../constants.ts';

import { getRequestBody, makeResponse } from './utils.ts';
import { gettingUser } from './common.ts';


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

        makeResponse(response, STATUS_CODES.SUCCESS, { user });
    });
};
