import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SingupModule } from './singup/singup.module';
import { CreatureModule } from './creature/creature.module';
import { BattleModule } from './battle/battle.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://harrisonpepese:RQzxfEt7PIYvmje3@gamedb.nbjgrzw.mongodb.net/?retryWrites=true&w=majority',
    ),
    AuthModule,
    UserModule,
    SingupModule,
    CreatureModule,
    BattleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
