import WebSocket from 'ws';
import http from 'http';
import path from 'path';
import { readFile } from 'fs';
import dotenv from 'dotenv';
import { printMessage } from './utils/printMessage';
import { handlerConnection } from './common/handlerConnection';

dotenv.config();
const DEFAULT_PORT = 8181;
const port = process.env.PORT || DEFAULT_PORT;

const httpServer = http.createServer((req, res) => {
  const __dirname = path.resolve(path.dirname(''));
  const file_path = path.join(__dirname, (req.url === '/' ? '/front/index.html' : `/front${req.url}`));

  readFile(file_path, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
});

httpServer.listen(port, () => {
  printMessage<string>(`Start static http server on the ${port} port!`);
});

const wsServer = new WebSocket.Server({ port: 3000 });

wsServer.on('connection', (ws: WebSocket) => {
  printMessage<string>('ws start');
  ws.on('message', handlerConnection.message.bind(null, ws))
    .on('error', handlerConnection.error)
    .on('close', handlerConnection.close);
});
