const ws = require('ws');
const PORT = 8080;
const wss = new ws.Server({ port: PORT });

wss.on('connection', ws => {
  console.log(`${new Date().toISOString()} socket connection on ${PORT}`)
  ws.on('message', message => {
    console.log(`${new Date().toISOString()} received ${message}`);
  });
});