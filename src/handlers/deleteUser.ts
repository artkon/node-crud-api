import cluster from 'node:cluster';

import { UserService } from '../UserService.ts';
import { STATUS_CODES } from '../constants.ts';

import { gettingUser } from './common.ts';
import { makeResponse } from './utils.ts';


export const deleteUser = (request, response) => {
    const user = gettingUser(request, response);

    if (!user) {
        return;
    }

    UserService.deleteUser(user.id);

    if (cluster.isWorker) {
        process.send(UserService.getUsers());
    }

    makeResponse(response, STATUS_CODES.DELETED);
};
