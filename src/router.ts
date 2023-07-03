import { createUser, getUser, getUsers, unknownRequest, updateUser, deleteUser } from './handlers/index.js';

import { getRequestURL, isApiUserIdPath, isApiUserPath } from './utils.js';
import { METHODS, STATUS_CODES } from './constants.js';
import { makeResponse } from './handlers/utils.js';


const errorHandler = (func) => (request, response) => {
    try {
        func(request, response);
    } catch {
        makeResponse(response, STATUS_CODES.SERVER_ERROR, { message: 'Internal Server Error' });
    }
};

export const router = errorHandler((request, response) => {
    const { method } = request;
    const { pathname } = getRequestURL(request);

    if (isApiUserPath(pathname)) {
        if (method === METHODS.GET) {
            getUsers(request, response);

            return;
        }

        if (method === METHODS.POST) {
            createUser(request, response);

            return;
        }
    } else if (isApiUserIdPath(pathname)) {
        if (method === METHODS.GET) {
            getUser(request, response);

            return;
        }
        if (method === METHODS.PUT) {
            updateUser(request, response);

            return;
        }
        if (method === METHODS.DELETE) {
            deleteUser(request, response);

            return;
        }
    } else {
        unknownRequest(request, response);

        return;
    }
});
