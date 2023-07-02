import 'dotenv/config';
import http from 'node:http';

import { router } from './router.ts';


const mainPort = process.env['PORT'];

const server = http.createServer((request, response) => {
    router(request, response);
});

server.listen(mainPort);
