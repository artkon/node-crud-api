import { getRequestURL, getUserIdFromPath } from '../utils.js';
import { UserService } from '../UserService.js';
import { makeResponse } from './utils.js';
import { STATUS_CODES } from '../constants.js';

export const gettingUser = (request, response) => {
    const { pathname } = getRequestURL(request);

    const uuid = getUserIdFromPath(pathname);
    const isValidUUID = UserService.getIsValidUUID(uuid);

    if (!isValidUUID) {
        makeResponse(response, STATUS_CODES.INVALID, { message: 'Provided userId is invalid' });

        return;
    }

    const user = UserService.getUser(uuid);

    if (!user) {
        makeResponse(response, STATUS_CODES.NOT_FOUND, { message: 'Requested user not found' });

        return;
    }

    return user;
};
