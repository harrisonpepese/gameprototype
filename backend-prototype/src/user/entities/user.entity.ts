/* eslint-disable @typescript-eslint/no-inferrable-types */
import * as bcript from 'bcrypt';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import Creature from 'src/creature/entities/creature.entity';
import CreatureActions from 'src/creature/entities/creatureActions.entity';

export type UserDocument = HydratedDocument<User>;

@Schema()
export default class User {
  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
  @Prop()
  id: string;
  @Prop()
  nickName: string;
  @Prop()
  fullName: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop()
  creatures: Creature[];
  @Prop()
  creatureActions: CreatureActions[];
  @Prop()
  gameCoins: number = 0;
  @Prop()
  cashCoins: number = 0;

  async changePassword(currentPassword: string, newPassword: string) {
    if (currentPassword === newPassword) {
      throw 'error';
    }
    this.password = await this.hashPassword(newPassword);
  }
  async verifyPassword(rawPassword: string) {
    return await bcript.compare(rawPassword, this.password);
  }
  async hashPassword(rawPassword: string): Promise<string> {
    return await bcript.hash(rawPassword, await bcript.genSalt());
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
