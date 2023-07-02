import { gettingUser } from './common.ts';
import { UserService } from '../UserService.ts';
import { makeResponse } from './utils.ts';
import { STATUS_CODES } from '../constants.ts';


export const deleteUser = (request, response) => {
    const user = gettingUser(request, response);

    if (!user) {
        return;
    }

    UserService.deleteUser(user.id);

    makeResponse(response, STATUS_CODES.DELETED);
};
