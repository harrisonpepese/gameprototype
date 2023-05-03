import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreatureService } from './creature.service';
import { UpdateCreatureDto } from './dto/update-creature.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('creature')
@UseGuards(JwtAuthGuard)
export class CreatureController {
  constructor(private readonly creatureService: CreatureService) {}

  @Post('add')
  @UseGuards(JwtAuthGuard)
  addCreature(@Request() req) {
    const { userId } = req.user;
    return this.creatureService.addNewCreature(userId);
  }

  @Get(':userId')
  findAll(@Param('userId') userId: string) {
    return this.creatureService.findAllByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.creatureService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCreatureDto: UpdateCreatureDto,
  ) {
    return this.creatureService.updateName(id, updateCreatureDto);
  }
}
