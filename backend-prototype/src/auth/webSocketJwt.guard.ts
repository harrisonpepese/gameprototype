import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Socket } from 'dgram';

@Injectable()
export class WebSocketJwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ws = context.switchToWs().getClient();
    return ws.handshake;
  }
}
