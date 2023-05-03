import { Body, Controller, Post } from '@nestjs/common';
import { SingupService } from './singup.service';
import { SingUpDto } from './dto/sing-up.dto';

@Controller('singup')
export class SingupController {
  constructor(private readonly singupService: SingupService) {}
  @Post()
  singUp(@Body() dto: SingUpDto) {
    return this.singupService.singUp(dto);
  }
}
