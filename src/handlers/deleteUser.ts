import cluster from 'node:cluster';

import { UserService } from '../UserService.js';
import { STATUS_CODES } from '../constants.js';

import { gettingUser } from './common.js';
import { makeResponse } from './utils.js';


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
