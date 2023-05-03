import Random from 'src/utils/random';

export default class CreatureAttributes {
  constructor(init?: Partial<CreatureAttributes>) {
    Object.assign(this, init);
  }
  strength: number;
  defense: number;
  intelligence: number;
  agility: number;
  vitality: number;

  static createEmptyAttributes() {
    return new CreatureAttributes({
      strength: 0,
      defense: 0,
      intelligence: 0,
      agility: 0,
      vitality: 0,
    });
  }
  static createBasicAttributes() {
    return new CreatureAttributes({
      strength: Random.range(1, 5),
      defense: Random.range(1, 5),
      intelligence: Random.range(1, 5),
      agility: Random.range(1, 5),
      vitality: Random.range(1, 5),
    });
  }
}
