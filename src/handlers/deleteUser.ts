import { gettingUser } from './common.ts';
import { UserDB } from '../userDb.ts';
import { makeJsonResponse} from './utils.ts';
import { STATUS_CODES } from '../constants.ts';


export const deleteUser = (request, response) => {
    const user = gettingUser(request, response);

    if (!user) {
        return;
    }

    UserDB.deleteUser(user.id);

    makeJsonResponse(response, STATUS_CODES.DELETED, { message: 'User deleted successfully' });
};
