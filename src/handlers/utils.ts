import { CONTENT_TYPE_JSON } from '../constants.ts';


export const makeJsonResponse = (response, status, data) => {
    response.writeHead(status, CONTENT_TYPE_JSON);
    response.end(JSON.stringify(data));
};

export const getRequestBody = (request, callback) => {
    let data = '';

    request.on('data', (chunk) => {
        data += chunk;
    });

    request.on('end', () => {
        callback?.(data);
    });
};
