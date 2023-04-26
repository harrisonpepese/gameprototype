import { Module } from '@nestjs/common';
import { SingupService } from './singup.service';
import { SingupController } from './singup.controller';

@Module({
  controllers: [SingupController],
  providers: [SingupService]
})
export class SingupModule {}
