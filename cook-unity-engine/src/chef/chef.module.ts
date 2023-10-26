import { Module } from '@nestjs/common';
import { ChefController } from './chef.controller';

@Module({
  controllers: [ChefController]
})
export class ChefModule {}
