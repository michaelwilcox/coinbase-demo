import { ENDPOINTS } from '../constants';
import EventEmitter from 'eventemitter3';

export interface WebSocketClient {
    emitter: EventEmitter
    socket: WebSocket
    send: Function
    listen: Function
}

class WS implements WebSocketClient {
    emitter: EventEmitter;
    socket: WebSocket;
    constructor() {
        this.emitter = new EventEmitter();
        this.socket = new WebSocket(ENDPOINTS.WEBSOCKET_SERVER);
        console.log(`socket instantiated on ${ENDPOINTS.WEBSOCKET_SERVER}`);

        this.socket.addEventListener('open', (event) => {
            console.log('open', event, this.socket);
        });

        this.socket.addEventListener('message', (event) => {
            if (event.data instanceof Blob) {
                const reader = new FileReader();
        
                reader.onload = () => {
                    this.emitter.emit('message', reader.result);
                };
        
                reader.readAsText(event.data);
            } else {
                this.emitter.emit('message', event.data);
            }
        });
    }
    send(message: string) {
        this.socket.send(message)
    }
    listen(cb: any) {
        this.emitter.on('message', cb);
    }
}

const ws = new WS();

export default ws;