import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SingUpDto } from './dto/sing-up.dto';
import User from 'src/user/entities/user.entity';

@Injectable()
export class SingupService {
  constructor(private userService: UserService) {}
  async singUp(dto: SingUpDto) {
    let user: User = await this.userService.findByEmail(dto.email);
    if (user) {
      throw 'this email is alreday in use';
    }
    user = await this.userService.create(dto);
    return user;
  }
}
