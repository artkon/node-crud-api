import { getRequestURL, getUserIdFromPath } from '../utils.ts';
import { UserService } from '../UserService.ts';
import { makeResponse } from './utils.ts';
import { STATUS_CODES } from '../constants.ts';

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
