import { WebSocketGateway } from '@nestjs/websockets';
import { BattleService } from './battle.service';

@WebSocketGateway()
export class BattleGateway {
  constructor(private readonly battleService: BattleService) {}
}
