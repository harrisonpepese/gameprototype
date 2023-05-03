import { Module, forwardRef } from '@nestjs/common';
import { SingupService } from './singup.service';
import { SingupController } from './singup.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [SingupController],
  providers: [SingupService],
})
export class SingupModule {}
