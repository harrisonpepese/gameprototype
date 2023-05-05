import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { BattleService } from './battle.service';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@WebSocketGateway({ namespace: 'battle' })
export class BattleGateway {
  @WebSocketServer() server: Server;
  constructor(private readonly battleService: BattleService) {}
  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('battleMatch')
  battleMatch(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
    console.log(data);
    return this.battleService.battleMatch();
  }
}
