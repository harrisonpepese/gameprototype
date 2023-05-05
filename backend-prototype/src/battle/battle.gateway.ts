import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { BattleService } from './battle.service';
import { Server, Socket } from 'socket.io';
import { UseGuards, Request } from '@nestjs/common';
import { WebSocketJwtAuthGuard } from 'src/auth/webSocketJwt.guard';
import { randomUUID } from 'crypto';

@WebSocketGateway({ namespace: 'battle', cors: '*:*' })
export class BattleGateway {
  @WebSocketServer() server: Server;
  constructor(private readonly battleService: BattleService) {}

  @UseGuards(WebSocketJwtAuthGuard)
  @SubscribeMessage('findMatch')
  async findMatch(
    @Request() req,
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ) {
    const { userId } = req.handshake.user;
    await this.battleService.addPlayerToQueue(userId, client);
    client.emit('wattingBattle');
  }
}
