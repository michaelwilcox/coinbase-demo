const ws = require('ws');
const PORT = 8080;
const COINBASE_API = `wss://ws-feed.pro.coinbase.com`;

const wss1 = new ws.Server({ port: PORT });
const wss2 = new ws.WebSocket(COINBASE_API);
let site = null;

wss1.on('connection', ws => {
  console.log(`${new Date().toISOString()} socket connection on ${PORT}`);
  site = ws;
  ws.on('message', message => {
    console.log(`${new Date().toISOString()} received ${message}`);
    wss2.send(JSON.stringify({ type: 'subscribe', product_ids: [`${message}-USD`], channels: ['level2', 'heartbeat'] }));
  });
});

wss2.on('open', () => {
  console.log(`${new Date().toISOString()} socket connection to Coinbase on ${COINBASE_API}`);
});

wss2.on('message', (message) => {
  console.log(`${new Date().toISOString()} Coinbase API sent ${message}`);
  site.send(message);
});