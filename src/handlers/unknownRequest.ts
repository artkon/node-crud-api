import { NOT_FOUND_MESSAGE, STATUS_CODES } from '../constants.ts';
import { makeResponse } from './utils.ts';


export const unknownRequest = (request, response) => {
    makeResponse(response, STATUS_CODES.NOT_FOUND, { message: NOT_FOUND_MESSAGE });
};
