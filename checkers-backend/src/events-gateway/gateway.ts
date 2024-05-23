import { OnModuleInit } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from 'socket.io';

@WebSocketGateway({
    cors: true
})
export class MyGateway implements OnModuleInit {
    @WebSocketServer()
    server: Server

    onModuleInit() { }

    @SubscribeMessage('Moves')
    onNewMessage(@MessageBody() body) {
        this.server.emit('Moves', {
            msg: `Move was made`,
            content: body,
        });
    }
}