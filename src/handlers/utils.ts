import { ServerResponse, ClientRequest } from 'http';

import { CONTENT_TYPE_JSON, CONTENT_TYPE_TEXT } from '../constants.js';


export const makeResponse = (
    response: ServerResponse,
    status: number,
    data?: object,
) => {
    response.writeHead(status, data ? CONTENT_TYPE_JSON : CONTENT_TYPE_TEXT);
    response.end(JSON.stringify(data));
};

export const getRequestBody = (
    request: ClientRequest,
    callback: (data: string) => void,
): void => {
    let data = '';

    request.on('data', (chunk) => {
        data += chunk;
    });

    request.on('end', () => {
        callback?.(data);
    });
};
