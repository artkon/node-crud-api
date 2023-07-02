import { getRequestURL, getUserIdFromPath } from '../utils.ts';
import { UserDB } from '../userDb.ts';
import { makeJsonResponse } from './utils.js';
import { STATUS_CODES } from '../constants.js';

export const gettingUser = (request, response) => {
    const { pathname } = getRequestURL(request);

    const uuid = getUserIdFromPath(pathname);
    const isValidUUID = UserDB.getIsValidUUID(uuid);

    if (!isValidUUID) {
        makeJsonResponse(response, STATUS_CODES.INVALID, { message: 'Provided userId is invalid' });

        return;
    }

    const user = UserDB.getUser(uuid);

    if (!user) {
        makeJsonResponse(response, STATUS_CODES.NOT_FOUND, { message: 'Requested user not found' });

        return;
    }

    return user;
};
