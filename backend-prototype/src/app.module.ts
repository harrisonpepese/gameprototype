import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SingupModule } from './singup/singup.module';
import { CreatureModule } from './creature/creature.module';
import { BattleModule } from './battle/battle.module';
import { BreedModule } from './breed/breed.module';

@Module({
  imports: [AuthModule, SingupModule, CreatureModule, BattleModule, BreedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
