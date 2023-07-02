import { STATUS_CODES } from '../constants.ts';
import { makeResponse } from './utils.ts';
import { gettingUser } from './common.ts';


export const getUser = (request, response) => {
    const user = gettingUser(request, response);

    if(!user) {
        return;
    }

    makeResponse(response, STATUS_CODES.SUCCESS, { user });
};
