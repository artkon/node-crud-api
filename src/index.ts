import 'dotenv/config';
import http from 'node:http';

import { router } from './router.ts';


const mainPort = process.env['PORT'];

export const server = http.createServer((request, response) => {
    router(request, response);
}).listen(mainPort);
