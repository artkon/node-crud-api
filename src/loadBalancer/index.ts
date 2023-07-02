import 'dotenv/config';
import os from 'node:os';
import cluster from 'node:cluster';
import http from 'node:http';

import { router } from '../router.ts';
import { UserService } from '../UserService.js';


if (cluster.isPrimary) {
    const numParallelism = os.availableParallelism();
    const mainPort = Number(process.env['PORT']);
    const instances = [];
    let nextInstanceIndex = 0;
    const getNextInstanceIndex = () => {
        nextInstanceIndex = (nextInstanceIndex % numParallelism) + 1;

        return nextInstanceIndex;
    };

    const sendToAllWorkers = (users) => {
        instances.forEach((instance) => {
            instance.send(users);
        })
    };

    for (let index = 1; index <= numParallelism; index += 1) {
        const workerPort = mainPort + index;
        const instance = cluster.fork({ workerPort });
        instance.on('message', (users) => {
            sendToAllWorkers(users);
        });

        instances.push(instance);
    }

    http.createServer((request, response) => {
        const instanceIndex = getNextInstanceIndex();

        const targetOptions = {
            hostname: 'localhost',
            port: mainPort + instanceIndex,
            path: request.url,
            method: request.method,
            headers: request.headers,
        };

        const targetRequest = http.request(targetOptions, (targetRes) => {
            response.writeHead(targetRes.statusCode, targetRes.headers);
            targetRes.pipe(response);
        });

        request.pipe(targetRequest);
    }).listen(mainPort);

    console.log('Wait until all workers be ready...')
} else if (cluster.isWorker) {
    const port = process.env['workerPort'];

    console.log(`Worker localhost:${port} is Ready!`);

    process.on('message', (users) => {
        UserService.setUsers(users);
    });

    http.createServer((request, response) => {
        router(request, response);
    }).listen(port);
}
