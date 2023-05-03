/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import Creature from 'src/creature/entities/creature.entity';
import CreatureActions from 'src/creature/entities/creatureActions.entity';

export type UserDocument = HydratedDocument<User>;

@Schema()
export default class User {
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
}

export const UserSchema = SchemaFactory.createForClass(User);
