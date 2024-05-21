import { OnModuleInit } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import {Server} from 'socket.io';

@WebSocketGateway({ 
    cors: true
    // {
    //     origin: 'http://localhost:5173'
    // }
})
export class MyGateway implements OnModuleInit{
    @WebSocketServer()
    server: Server

    onModuleInit() {
        this.server.on('connection', (socket) => {
            console.log(socket.id);
            console.log('Connected');
        });
    }

    @SubscribeMessage('newMessage')
    onNewMessage(@MessageBody() body: string) {
        console.log(body);
        this.server.emit('onMessage',{
            msg: 'New Message',
            content: body,
        });
    }
    @SubscribeMessage('boardCreationData')
    onBoardCreation(@MessageBody() creationData: string){
        console.log('Server received board creation data!'),
        console.log("creaton data: ", creationData),
        this.server.emit('newBoardData',{
            msg: 'boardData',
            content: creationData,
        });
    }

    @SubscribeMessage('boardData')
    onMove(@MessageBody() boardData: string){
        console.log('server received boardData'),
        console.log('boardData: ', boardData);
    }

    @SubscribeMessage('playerid')
    onPlayer1id(@MessageBody() playerid: string){
        console.log('server received player1id'),
        console.log('playerid: ', playerid);
    }

}