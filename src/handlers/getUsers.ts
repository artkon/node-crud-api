import { UserService } from '../UserService.js';

import { STATUS_CODES } from '../constants.js';
import { makeResponse } from './utils.js';

export const getUsers = (request, response) => {
    makeResponse(response, STATUS_CODES.SUCCESS, { users: UserService.getUsers() });
};
