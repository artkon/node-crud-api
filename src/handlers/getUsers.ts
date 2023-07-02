import { UserDB } from '../userDb.ts';

import { STATUS_CODES } from '../constants.ts';
import { makeJsonResponse } from './utils.ts';

export const getUsers = (request, response) => {
    makeJsonResponse(response, STATUS_CODES.SUCCESS, { users: UserDB.getUsers() });
};
