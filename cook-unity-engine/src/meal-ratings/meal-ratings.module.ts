import { Module } from '@nestjs/common';
import { MealRatingsService } from './meal-ratings.service';
import { MealRatingsController } from './meal-ratings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealRating } from './entities/meal-rating.entity';
import { UsersModule } from 'src/users/users.module';
import { MealsModule } from 'src/meals/meals.module';

@Module({
  imports:[UsersModule, MealsModule, TypeOrmModule.forFeature([MealRating])],
  providers: [MealRatingsService],
  controllers: [MealRatingsController]
})
export class MealRatingsModule {}
