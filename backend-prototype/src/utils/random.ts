import { Injectable } from '@nestjs/common';

@Injectable()
export default class Random {
  static range(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
