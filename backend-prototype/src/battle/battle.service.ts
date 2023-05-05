import { Injectable } from '@nestjs/common';
import {
  Battle,
  BattleRound,
  BattleRoundAction,
  BattleUser,
} from './entities/battle.entity';
import User from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Socket } from 'dgram';
import { WebSocketServer } from '@nestjs/websockets';
import { use } from 'passport';
import BattleCreatureStatus from './entities/battleCreatureStatus';

type AwaitingPlayer = {
  user: User;
  socket: Socket;
};

@Injectable()
export class BattleService {
  activeBattles: Battle[];
  playersAwaitingMatch: AwaitingPlayer[];
  battlematcherPromise: Promise<void>;
  constructor(private userService: UserService) {
    this.activeBattles = [];
    this.playersAwaitingMatch = [];
  }
  async addPlayerToQueue(userId: string, socket: any) {
    const user = await this.userService.findOne(userId);
    this.playersAwaitingMatch.push({ user, socket });
    console.log(this.playersAwaitingMatch);
  }
  async battleMatcherPromise() {
    let mathFound = true;
    while (mathFound) {
      if (this.playersAwaitingMatch.length) {
        return false;
      }
      if (this.playersAwaitingMatch.length >= 2) {
        const battle = new Battle();
        battle.players.push(
          this.createBattlePlayer(this.playersAwaitingMatch[0].user, 0),
          this.createBattlePlayer(this.playersAwaitingMatch[1].user, 0),
        );
        this.activeBattles.push();
        mathFound = false;
        return;
      }
      await new Promise((res) => {
        setTimeout(() => res, 500);
      });
    }
  }
  createBattlePlayer(user: User, creatureIndex: number): BattleUser {
    const creature = user.creatures[creatureIndex];
    creature.calcStatus();
    return {
      user,
      creature: creature,
      battleStatus: new BattleCreatureStatus(creature.status),
    };
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
