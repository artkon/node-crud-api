import { STATUS_CODES } from '../constants.js';
import { makeResponse } from './utils.js';
import { gettingUser } from './common.js';


export const getUser = (request, response) => {
    const user = gettingUser(request, response);

    if(!user) {
        return;
    }

    makeResponse(response, STATUS_CODES.SUCCESS, { user });
};
