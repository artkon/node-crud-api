import { STATUS_CODES } from '../constants.ts';
import { makeJsonResponse } from './utils.ts';
import { gettingUser } from './common.ts';


export const getUser = (request, response) => {
    const user = gettingUser(request, response);

    makeJsonResponse(response, STATUS_CODES.SUCCESS, { user });
};
