import { ENDPOINTS } from '../constants';

export interface WebSocketClient {
    socket: WebSocket
    send: Function
}

class WS implements WebSocketClient {
    socket: WebSocket;
    constructor() {
        this.socket = new WebSocket(ENDPOINTS.WEBSOCKET_SERVER, 'echo-protocol');
        console.log(`socket instantiated on ${ENDPOINTS.WEBSOCKET_SERVER}`);

        this.socket.addEventListener('open', (event) => {
            console.log('open', event);
        });

        this.socket.addEventListener('message', (event) => {
            if (event.data instanceof Blob) {
                const reader = new FileReader();
        
                reader.onload = () => {
                    console.log(reader.result);
                };
        
                reader.readAsText(event.data);
            } else {
                console.log(event.data);
            }
        });
    }
    send(message: string) {
        this.socket.send(message)
    }
}

const ws = new WS();

export default ws;