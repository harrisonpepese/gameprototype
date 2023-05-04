import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import CreatureStatus from '../valueObjects/createStatus.valueObject';
import CreatureAttributes from '../valueObjects/creatureAttributes.valueObject';
import CreatureActions from './creatureActions.entity';
import { CreatureElement } from '../enums/creatureElement.enum';
import Random from 'src/utils/random';

@Schema()
export default class Creature {
  constructor(init?: Partial<Creature>) {
    Object.assign(this, init);
  }
  @Prop()
  name: string;
  @Prop()
  level: number;
  @Prop()
  element: CreatureElement;
  @Prop()
  attrPoints: number;
  @Prop()
  usedAttrPoints: number;
  @Prop()
  baseAttributes: CreatureAttributes;
  @Prop()
  attributes: CreatureAttributes;
  @Prop()
  actions: CreatureActions[];

  status: CreatureStatus;
  totalAttributes: CreatureAttributes;

  addAttributePoint(attributeName: keyof CreatureAttributes) {
    this.attributes[attributeName]++;
    this.usedAttrPoints--;
    this.calcStatus();
  }
  subAttributPoint(attributeName: keyof CreatureAttributes) {
    this.attributes[attributeName]--;
    this.usedAttrPoints++;
    this.calcStatus();
  }
  calcTotalAttributes() {
    const totalAtributes = new CreatureAttributes();
    for (const attr of Object.keys(totalAtributes)) {
      totalAtributes[attr] = this.baseAttributes[attr] + this.attributes[attr];
    }
  }
  calcStatus() {
    const newStatus = CreatureStatus.createBasicStatus();
    newStatus.attackPower +=
      (this.attributes.strength + this.baseAttributes.strength) * 2;
    newStatus.defensePower +=
      (this.attributes.defense + this.baseAttributes.defense) * 2;
    newStatus.stamina +=
      (this.attributes.intelligence + this.baseAttributes.intelligence) * 2;
    newStatus.life +=
      (this.attributes.vitality + this.baseAttributes.vitality) * 2;
    newStatus.speed +=
      (this.attributes.agility + this.baseAttributes.agility) * 2;
    this.status = newStatus;
  }
  static CreateBasicCreature() {
    const creature = new Creature({
      level: 1,
      element: Random.range(0, Object.keys(CreatureElement).length / 2 - 1),
      attrPoints: 0,
      usedAttrPoints: 0,
      baseAttributes: CreatureAttributes.createBasicAttributes(),
      attributes: CreatureAttributes.createEmptyAttributes(),
      actions: [],
    });
    creature.calcStatus();
    return creature;
  }
  levelUp() {
    this.level++;
    this.attrPoints += 1;
  }
  resetAttributes() {
    this.attributes = CreatureAttributes.createEmptyAttributes();
    this.attrPoints = this.usedAttrPoints;
    this.usedAttrPoints = 0;
  }
}
