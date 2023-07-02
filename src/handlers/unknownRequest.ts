import { NOT_FOUND_MESSAGE, STATUS_CODES } from '../constants.ts';
import { makeJsonResponse } from './utils.js';


export const unknownRequest = (request, response) => {
    makeJsonResponse(response, STATUS_CODES.NOT_FOUND, { message: NOT_FOUND_MESSAGE });
};
