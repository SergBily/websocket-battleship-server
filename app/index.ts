import WebSocket from 'ws';
import http from 'node:http';
import path from 'node:path';
import { readFile } from 'node:fs';
import dotenv from 'dotenv';
import { printMessage } from './libraries/utils/print-message';
import { handlerConnection } from './libraries/common/handler-connection';

dotenv.config();
const DEFAULT_PORT = 8181;
const port = process.env.PORT || DEFAULT_PORT;

const httpServer = http.createServer((request, response) => {
  const __dirname = path.resolve(path.dirname(''));
  const file_path = path.join(__dirname, (request.url === '/' ? '/front/index.html' : `/front${request.url}`));

  readFile(file_path, (error, data) => {
    if (error) {
      response.writeHead(404);
      response.end(JSON.stringify(error));
      return;
    }
    response.writeHead(200);
    response.end(data);
  });
});

httpServer.listen(port, () => {
  printMessage<string>(`Start static http server on the ${port} port!`);
});

const wsServer = new WebSocket.Server({ port: 3000 });

wsServer.on('connection', (ws: WebSocket) => {
  printMessage<string>('ws start');
  ws.on('message', handlerConnection.message.bind(undefined, ws))
    .on('error', handlerConnection.error)
    .on('close', handlerConnection.close);
});
