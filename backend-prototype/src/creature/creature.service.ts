import { Injectable } from '@nestjs/common';
import { CreateCreatureDto } from './dto/create-creature.dto';
import { UpdateCreatureDto } from './dto/update-creature.dto';
import User from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import Creature from './entities/creature.entity';

@Injectable()
export class CreatureService {
  constructor(private userService: UserService) {}
  async addNewCreature(userId: string) {
    const user = await this.userService.findOne(userId);
    user.creatures.push(await this.create());
    await user.save();
    return user;
  }

  async create() {
    return Creature.CreateBasicCreature();
  }

  findAllByUser(userId: string) {
    return `This action returns all creature`;
  }

  findOne(id: string) {
    return `This action returns a #${id} creature`;
  }

  updateName(id: string, updateCreatureDto: UpdateCreatureDto) {
    return `This action updates a #${id} creature`;
  }
}
