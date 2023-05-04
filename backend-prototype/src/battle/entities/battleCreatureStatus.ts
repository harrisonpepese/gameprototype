import CreatureStatus from 'src/creature/valueObjects/createStatus.valueObject';

export default class BattleCreatureStatus {
  constructor(creatureStatus: CreatureStatus) {
    this.maxLife = creatureStatus.life;
    this.maxStamina = creatureStatus.stamina;
    this.attackPower = creatureStatus.attackPower;
    this.defensePower = creatureStatus.defensePower;
    this.speed = creatureStatus.speed;
    this.resetCurrentStatus();
  }
  maxLife: number;
  maxStamina: number;
  attackPower: number;
  defensePower: number;
  speed: number;
  // current
  currentLife: number;
  currentStamina: number;
  currentAttackPower: number;
  currentDefensePower: number;
  currentSpeed: number;
  //effects: string;

  resetCurrentStatus() {
    this.currentLife = this.maxLife;
    this.currentStamina = this.maxStamina;
    this.currentAttackPower = this.attackPower;
    this.currentDefensePower = this.defensePower;
    this.currentSpeed = this.speed;
  }
  isAlive() {
    return this.currentLife <= 0;
  }
  damage(amount: number, defBonus?: number) {
    const damage = amount - (this.currentDefensePower + (defBonus || 0));
    if (damage <= 0) {
      this.currentLife--;
    }
    this.currentLife -= amount;
    if (this.currentLife < 0) {
      this.currentLife = 0;
    }
  }

  heal(percentage: number) {
    this.currentLife += this.maxLife * percentage;
    if (this.currentLife > this.maxLife) {
      this.currentLife = this.maxLife;
    }
  }

  weary(amount: number) {
    this.currentStamina -= amount;
    if (this.currentStamina < 0) {
      this.currentStamina == 0;
    }
  }

  rest(percentage: number) {
    this.currentStamina += this.maxStamina * percentage;
    if (this.currentStamina > this.maxStamina) {
      this.currentStamina = this.maxStamina;
    }
  }
}
