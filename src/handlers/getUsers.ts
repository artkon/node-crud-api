import { UserService } from '../UserService.ts';

import { STATUS_CODES } from '../constants.ts';
import { makeResponse } from './utils.ts';

export const getUsers = (request, response) => {
    makeResponse(response, STATUS_CODES.SUCCESS, { users: UserService.getUsers() });
};
