import { Inject, Injectable } from '@nestjs/common';
import Creature from './entities/creature.entity';
import { UtilsService } from 'src/utils/utils.service';
import CreatureStatus from './valueObjects/createStatus.valueObject';

@Injectable()
export default class CreatureBreedService {
  private randonFactor = 0.2;
  constructor(@Inject() private utils: UtilsService) {}
  breed(creatureOne: Creature, creatureTwo: Creature): Creature {
    const newCreature = new Creature();
    const baseStatus = new CreatureStatus();
    for (const status in baseStatus) {
      baseStatus[status] = this.generateRandom(
        this.calcAverage(
          creatureOne.baseStatus[status],
          creatureTwo.baseStatus[status],
        ),
      );
    }
    newCreature.baseStatus = baseStatus;
    return newCreature;
  }
  calcAverage(valueOne: number, valueTwo: number): number {
    return (valueOne + valueTwo) / 2;
  }
  calcRandomRange(average: number): number {
    return average * this.randonFactor;
  }
  generateRandom(average: number) {
    const variacao = this.calcRandomRange(average);
    const min = Math.ceil(average - variacao);
    const max = Math.floor(average + variacao);
    return this.utils.randomRage(min, max);
  }
}
