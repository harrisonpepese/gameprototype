import { Injectable } from '@nestjs/common';
import {
  Battle,
  BattleRound,
  BattleRoundAction,
} from './entities/battle.entity';
import User from 'src/user/entities/user.entity';

@Injectable()
export class BattleService {
  activeBattles: Battle[];
  playersAwaitingMatch: User[];
  constructor() {
    this.activeBattles = [];
    this.playersAwaitingMatch = [];
  }
  battleMatch() {
    return 'match';
  }
  addBattleAction(battleId: string, playerAction: BattleRoundAction) {
    const battle = this.activeBattles.find((x) => x.uuid == battleId);
    const round = battle.getActiveRound();
    if (round.actions.find((x) => x.userId == playerAction.userId)) {
      return;
    }
    round.actions.push(playerAction);
    return battle;
  }
  executeRound(battle: Battle) {
    battle.executeRound();
  }
}
