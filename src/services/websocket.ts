import { ENDPOINTS } from '../constants';
import EventEmitter from 'eventemitter3';

interface ListenerMap {
    [name: string]: Array<Function>
}

export interface WebSocketClient {
    emitter: EventEmitter
    socket: WebSocket
    subscriptions: ListenerMap
    send(message: string): void
    subscribe(event: string, cb: Function): Function
}

class WS implements WebSocketClient {
    emitter: EventEmitter;
    socket: WebSocket;
    subscriptions: ListenerMap;
    constructor() {
        this.emitter = new EventEmitter();
        this.socket = new WebSocket(ENDPOINTS.WEBSOCKET_SERVER);
        this.subscriptions = {};
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
    subscribe(event: string, cb: Function) {
        if (!Array.isArray(this.subscriptions[event])) {
            this.subscriptions[event] = [];
        }

        this.subscriptions[event].push(cb);
        const index = this.subscriptions[event].length - 1;

        const unsubscribe = () => {
            this.subscriptions[event].splice(index, 1);
        }

        return unsubscribe.bind(this);
    }
}

const ws = new WS();

export default ws;