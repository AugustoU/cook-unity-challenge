import { Module } from '@nestjs/common';
import { MealRatingsService } from './services/meal-ratings.service';
import { MealRatingsController } from './controller/meal-ratings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealRating } from './entities/meal-rating.entity';
import { UsersModule } from '../users/users.module';
import { MealsModule } from '../meals/meals.module';

@Module({
  imports:[UsersModule, MealsModule, TypeOrmModule.forFeature([MealRating])],
  providers: [MealRatingsService],
  controllers: [MealRatingsController]
})
export class MealRatingsModule {}
