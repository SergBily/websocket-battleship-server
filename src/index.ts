import WebSocket from 'ws';
import http from 'http';
import path from 'path';
import { readFile } from 'fs';
import dotenv from 'dotenv';

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
  console.log(`Start static http server on the ${port} port!`);
});

const wsServer = new WebSocket.Server({ port: 3000 });

wsServer.on('connection', (ws: WebSocket) => {
  console.log('ws start');
});
