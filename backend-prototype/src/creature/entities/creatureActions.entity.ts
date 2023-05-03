import CreatureActionType from './creature.entity';

export default class CreatureAction {
  name: string;
  power: number;
  hitRate: number;
  speed: number;
  staminaCost: number;
  type: CreatureActionType;
}
