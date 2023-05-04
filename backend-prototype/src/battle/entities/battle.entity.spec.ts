import Creature from 'src/creature/entities/creature.entity';
import { Battle } from './battle.entity';
import BattleCreatureStatus from './battleCreatureStatus';
const mockCreature = Creature.CreateBasicCreature();
const mockCreature2 = Creature.CreateBasicCreature();
mockCreature2.baseAttributes.agility = 20;
mockCreature2.calcStatus();
describe('Battle', () => {
  const service = new Battle();
  it('targetHasDodge origin > target', () => {
    const result = service.targetHasDodge(
      new BattleCreatureStatus(mockCreature.status),
      new BattleCreatureStatus(mockCreature2.status),
    );
    expect(result).toBeInstanceOf(Boolean);
  });
  it('targetHasDodge origin < target', () => {
    const result = service.targetHasDodge(
      new BattleCreatureStatus(mockCreature2.status),
      new BattleCreatureStatus(mockCreature.status),
    );
    expect(result).toBeInstanceOf(Boolean);
  });
});
