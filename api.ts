const webSocketsServerPort = 8000;
const { server: webSocketServer } = require('websocket');
const http = require('http');
// Spinning the http server and the websocket server.
const server = http.createServer();
server.listen(webSocketsServerPort);
const wsServer = new webSocketServer({
  httpServer: server
});

function originIsAllowed(origin) {
  // TODO: put logic here to detect whether the specified origin is allowed.
  return true;
}

wsServer.on('request', (request) => {
  if (!originIsAllowed(request.origin)) {
    // Make sure we only accept requests from an allowed origin
    request.reject();
    console.log(`${new Date()} Connection from origin ${request.origin} rejected.`);
    return;
  }
  
  var connection = request.accept('echo-protocol', request.origin);
  console.log(`${new Date()} Connection accepted.`);
  connection.on('message', function(message) {
      if (message.type === 'utf8') {
          console.log(`Received Message: ${message.utf8Data}`);
          connection.sendUTF(`ack ${message.utf8Data}`);
      }
      else if (message.type === 'binary') {
          console.log(`Received Binary Message of ${message.binaryData.length} bytes`);
          connection.sendBytes(`ack ${message.binaryData}`);
      }
  });
  connection.on('close', function(reasonCode, description) {
      console.log(`${new Date()} Peer ${connection.remoteAddress} disconnected.`);
  });
});

console.log(`web socket server listening on port ${webSocketsServerPort}`);
