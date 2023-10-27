import { Module } from '@nestjs/common';
import { MealsController } from './meals.controller';
import { MealsService } from './meals.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meal } from './entities/meal.entity';

@Module({
  imports:[UsersModule, TypeOrmModule.forFeature([Meal])],
  controllers: [MealsController],
  providers: [MealsService]
})
export class MealsModule {}
