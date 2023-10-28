import { Module } from '@nestjs/common';
import { MealsController } from './controller/meals.controller';
import { MealsService } from './services/meals.service';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meal } from './entities/meal.entity';

@Module({
  imports:[UsersModule, TypeOrmModule.forFeature([Meal])],
  controllers: [MealsController],
  providers: [MealsService],
  exports:[MealsService]
})
export class MealsModule {}
