import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { MealsModule } from './meals/meals.module';
import { MealRatingsModule } from './meal-ratings/meal-ratings.module';
import { ChefsModule } from './chefs/chefs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),   
    AuthModule, 
    UsersModule, DatabaseModule, MealsModule, MealRatingsModule, ChefsModule]
})
export class AppModule {}
