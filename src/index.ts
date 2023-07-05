import WebSocket from 'ws';

const wsServer = new WebSocket.Server({ port: 3000 });

wsServer.on('connection', () => {
  console.log('ws server run');
});
