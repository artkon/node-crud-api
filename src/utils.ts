import { API_USERS } from './constants.ts';


export const getRequestURL = (request) => {
    const baseUrl = request.protocol + '://' + request.headers.host + '/';

    return new URL(request.url, baseUrl);
};

export const isApiUserPath = (pathname) => {
    if (!pathname.startsWith(API_USERS)) {
        return false;
    }

    const segments = pathname.split('/').filter(Boolean);

    return segments.length === 2;
};

export const isApiUserIdPath = (pathname) => {
    if (!pathname.startsWith(API_USERS)) {
        return false;
    }

    const segments = pathname.split('/').filter(Boolean);

    return segments.length === 3;
};

export const getUserIdFromPath = (pathname) => {
    const segments = pathname.split('/').filter(Boolean);

    return segments[2];
};
