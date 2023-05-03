import Random from 'src/utils/random';
import { UtilsService } from 'src/utils/utils.service';

export default class CreatureStatus {
  constructor(init?: Partial<CreatureStatus>) {
    Object.assign(this, init);
  }
  life: number;
  stamina: number;
  attackPower: number;
  defensePower: number;
  speed: number;

  static createBasicStatus() {
    return new CreatureStatus({
      life: 20,
      stamina: 10,
      attackPower: 5,
      defensePower: 5,
      speed: 5,
    });
  }
}
