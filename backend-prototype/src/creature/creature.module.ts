import { Module } from '@nestjs/common';
import { CreatureService } from './creature.service';
import { CreatureController } from './creature.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [CreatureController],
  providers: [CreatureService],
})
export class CreatureModule {}
