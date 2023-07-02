export enum STATUS_CODES {
    SUCCESS = 200,
    CREATED = 201,
    DELETED = 204,
    INVALID = 400,
    NOT_FOUND = 404,
    SERVER_ERROR = 500,
}

export enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export const NOT_FOUND_MESSAGE = 'Oops! The requested resource could not be found. Please check the API endpoint or verify the request parameters.';

export const CONTENT_TYPE_JSON = { 'Content-Type': 'application/json' };

export const API_USERS = '/api/users';
