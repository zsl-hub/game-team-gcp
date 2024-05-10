// import { Injectable } from '@nestjs/common';
// import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket  } from '@nestjs/websockets';
// import { Socket } from 'net';

// @Injectable()
// @WebSocketGateway(80, { transports: ['websocket'] })
// export class EventsGateway {
//     @SubscribeMessage('events')
//     handleEvent(
//         @MessageBody() data: string,
//         @ConnectedSocket() client: Socket,
//     ): string {
//         return data
//     }
// }