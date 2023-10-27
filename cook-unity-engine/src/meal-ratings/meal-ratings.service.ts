import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MealRating } from './entities/meal-rating.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { MealsService } from 'src/meals/meals.service';

@Injectable()
export class MealRatingsService {

    constructor(
        @InjectRepository(MealRating)
        private readonly mealRatingRepository: Repository<MealRating>,
        private readonly usersService: UsersService,
        private readonly mealService: MealsService
    ) { }

    async create(mealId: number, customerId: number, rating: number)
        : Promise<MealRating> {

        const exitsRating = await this.mealRatingRepository.findOne({
            where: {
                customer: { id: customerId },
                meal: { id: mealId },
            }
        });

        if(exitsRating){
            throw new ConflictException('Rating already exist');
        }

        const customer = await this.usersService.getById(customerId);
        if (!customer) {
            throw new NotFoundException(`Customer with ID ${customerId} not found`);
        }

        const meal = await this.mealService.getById(mealId);
        if (!meal) {
            throw new NotFoundException(`Meal with ID ${mealId} not found`);
        }

        const newRating = new MealRating();
        newRating.meal = meal;
        newRating.rating = rating;
        newRating.customer = customer;

        return await this.mealRatingRepository.save(newRating);
    }


    async getAverageRatingPerMeal(chefId: number){
        const query = this.mealRatingRepository
        .createQueryBuilder('meal_rating')
        .leftJoinAndSelect('meal_rating.meal', 'meal')
        .where('meal.ownerId = :chefId', { chefId })
        .select("meal_rating.mealId")
        .addSelect("AVG(rating)", "average")
        .groupBy("meal_rating.mealId")
  
      const result = await query.getRawMany();
  
      return result;
    }
}
