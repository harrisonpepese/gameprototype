import Creature from 'src/creature/entities/creature.entity';
import User from 'src/user/entities/user.entity';
import Random from 'src/utils/random';
import BattleCreatureStatus from './battleCreatureStatus';

export class Battle {
  uuid: string;
  started: boolean;
  players: BattleUser[];
  rounds: BattleRound[];

  getActiveRound() {
    return this.rounds[this.rounds.length - 1];
  }

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
    const round = this.getActiveRound();
    this.executeActions(
      round.actions.map((x) => {
        const player = this.players.find((y) => y.user.id == x.userId);
        return {
          action: x,
          player,
          actionPower: this.calcActionPower(x, player.battleStatus),
        };
      }),
    );
  }
  executeActions(dtos: BattleExecDto[]) {
    dtos.sort(
      (a, b) =>
        a.player.battleStatus.currentSpeed - b.player.battleStatus.currentSpeed,
    );
    for (const dto of dtos) {
      const origin = dto;
      const target = dtos.find((x) => x.player.user.id == dto.action.targetId);
      this.affectCreature(origin, target);
      if (target.player.battleStatus.currentLife == 0) {
        return;
      }
    }
  }

  baseAttack(origin: BattleExecDto, target: BattleExecDto) {
    if (target.action.actionType == BattleRoundActionType.defensePosition) {
      target.player.battleStatus.damage(origin.actionPower, target.actionPower);
      return;
    }
    if (target.action.actionType == BattleRoundActionType.dodgePosition) {
      const targetDodge = this.targetHasDodge(
        origin.player.battleStatus,
        target.player.battleStatus,
      );
      if (targetDodge) {
        target.player.battleStatus.weary(origin.actionPower * 0.5);
      } else {
        target.player.battleStatus.damage(origin.actionPower);
        target.player.battleStatus.weary(origin.actionPower * 0.3);
      }
      return;
    }
    target.player.battleStatus.damage(origin.actionPower);
  }

  targetHasDodge(
    origin: BattleCreatureStatus,
    target: BattleCreatureStatus,
  ): boolean {
    const seed = Random.random();
    if (origin.currentSpeed === target.currentSpeed) {
      return seed < 0.5 ? true : false;
    }
    const max = Math.max(origin.currentSpeed, target.currentSpeed);
    const originChance = origin.currentSpeed / max;
    const targetChance = target.currentSpeed / max;
    if (originChance > targetChance) {
      if (seed > targetChance) {
        return false;
      }
      return true;
    } else {
      if (seed < originChance) {
        return false;
      }
      return true;
    }
  }

  affectCreature(origin: BattleExecDto, target: BattleExecDto) {
    if (origin.action.actionType == BattleRoundActionType.baseAttack) {
      this.baseAttack(origin, target);
    }
    if (origin.action.actionType == BattleRoundActionType.meditation) {
      origin.player.battleStatus.heal(0.35);
      origin.player.battleStatus.rest(0.5);
    }
  }

  calcActionPower(
    action: BattleRoundAction,
    creatureStatus: BattleCreatureStatus,
  ) {
    switch (action.actionType) {
      case BattleRoundActionType.baseAttack:
        return creatureStatus.currentAttackPower;
      case BattleRoundActionType.defensePosition:
        return creatureStatus.currentDefensePower * 0.5;
      case BattleRoundActionType.dodgePosition:
        return creatureStatus.currentSpeed;
      case BattleRoundActionType.meditation:
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
  actionType: BattleRoundActionType;
  creatureSkillId?: string;
}
export interface BattleUser {
  user: User;
  creature: Creature;
  battleStatus: BattleCreatureStatus;
}
export enum BattleRoundActionType {
  baseAttack,
  defensePosition,
  dodgePosition,
  meditation,
  creatureSkill,
}
