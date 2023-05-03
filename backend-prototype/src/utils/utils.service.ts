import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  randomRage(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
