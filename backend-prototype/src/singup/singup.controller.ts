import { Controller } from '@nestjs/common';
import { SingupService } from './singup.service';

@Controller('singup')
export class SingupController {
  constructor(private readonly singupService: SingupService) {}
}
