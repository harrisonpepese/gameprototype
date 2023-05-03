import Creature from 'src/creature/entities/creature.entity';
import User from 'src/user/entities/user.entity';

export class Battle {
  started: boolean;
  playerOne: BattleUser;
  playerTwor: BattleUser;
  rounds: BattleRound[];
  startRound() {
    this.rounds.push({ active: true, actions: [] });
  }
  endRound() {
    this.rounds[this.rounds.length - 1].active = false;
  }
  executeRound(BattleRound) {
    const round = this.rounds[length - 1];
    const;
  }
}
export interface BattleRound {
  active: boolean;
  actions: BattleRoundActions[];
}
export interface BattleRoundActions {
  userId: string;
  randomSeed: number;
  actionType: BattleRoundActionsType;
  creatureSkillId?: string;
}
export interface BattleUser {
  user: User;
  userId: string;
  creature: Creature;
}
export enum BattleRoundActionsType {
  none,
  baseAttack,
  defensePosition,
  dodgePosition,
  meditation,
  creatureSkill,
}
