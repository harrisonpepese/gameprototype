import Creature from 'src/creature/entities/creature.entity';
import CreatureStatus from 'src/creature/valueObjects/createStatus.valueObject';
import User from 'src/user/entities/user.entity';
import Random from 'src/utils/random';

export class Battle {
  started: boolean;
  players: BattleUser[];
  rounds: BattleRound[];
  startBattle() {
    this.players.forEach((x) => x.creature.calcStatus());
    this.startRound();
  }
  startRound() {
    this.rounds.push({ active: true, actions: [] });
  }
  endRound() {
    this.rounds[this.rounds.length - 1].active = false;
  }
  executeRound() {
    const round = this.rounds[length - 1];
    round.actions.forEach((x) => (x.randomSeed = Random.range(5, 15)));
    this.executeActions(
      round.actions.map((x) => {
        const player = this.players.find((x) => x.userId == x.userId);
        return {
          action: x,
          player,
          actionPower: this.calcActionPower(x, player.creature.status),
        };
      }),
    );
  }
  executeActions(dtos: BattleExecDto[]) {
    for (const dto of dtos) {
      this.affectCreature(
        dto,
        dtos.find((x) => x.player.userId == dto.action.targetId),
      );
    }
  }

  affectCreature(origin: BattleExecDto, target: BattleExecDto) {
    if (origin.action.actionType == BattleRoundActionType.baseAttack) {
      if (target.action.actionType == BattleRoundActionType.defensePosition) {
        const damage = origin.actionPower - target.actionPower;
        if (damage <= 0) {
          target.player.creature.status.life -= 1;
        }
        target.player.creature.status.life -= damage;
      }
      if (target.action.actionType == BattleRoundActionType.dodgePosition) {
        const damage = origin.actionPower - target.actionPower;
        if (damage <= 0) {
          target.player.creature.status.life -= 1;
        }
        target.player.creature.status.life -= damage;
      }
    }
    if (origin.action.actionType == BattleRoundActionType.creatureSkill) {
      if (target.action.actionType == BattleRoundActionType.defensePosition) {
        const damage = origin.actionPower - target.actionPower;
        if (damage <= 0) {
          target.player.creature.status.life -= 1;
        }
        target.player.creature.status.life -= damage;
      }
      if (target.action.actionType == BattleRoundActionType.dodgePosition) {
        const damage = origin.actionPower - target.actionPower;
        if (damage <= 0) {
          target.player.creature.status.life -= 1;
        }
        target.player.creature.status.life -= damage;
      }
    }
    if (origin.action.actionType == BattleRoundActionType.meditation) {
    }
  }

  calcActionPower(action: BattleRoundAction, creatureStatus: CreatureStatus) {
    switch (action.actionType) {
      case BattleRoundActionType.baseAttack:
        return creatureStatus.attackPower * action.randomSeed;
      case BattleRoundActionType.defensePosition:
        return creatureStatus.defensePower * action.randomSeed;
      case BattleRoundActionType.dodgePosition:
        return creatureStatus.speed * action.randomSeed;
      case BattleRoundActionType.meditation:
        return creatureStatus.stamina * action.randomSeed;
      case BattleRoundActionType.none:
        return 0;
      case BattleRoundActionType.creatureSkill:
        return 0;
    }
  }
}
export interface BattleRound {
  active: boolean;
  actions: BattleRoundAction[];
}
export interface BattleExecDto {
  action: BattleRoundAction;
  player: BattleUser;
  actionPower: number;
}
export interface BattleRoundAction {
  userId: string;
  targetId: string;
  randomSeed: number;
  actionType: BattleRoundActionType;
  creatureSkillId?: string;
}
export interface BattleUser {
  user: User;
  userId: string;
  creature: Creature;
}
export enum BattleRoundActionType {
  none,
  baseAttack,
  defensePosition,
  dodgePosition,
  meditation,
  creatureSkill,
}
