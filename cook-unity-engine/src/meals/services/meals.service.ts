import { Injectable, NotFoundException } from '@nestjs/common';
import { Meal } from '../entities/meal.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationReponseDto } from '../../common/dtos/pagination.response.dto';
import { CreateMealDto } from '../dtos/create.meal.dto';
import { UsersService } from '../../users/services/users.service';
import { MealDto } from '../dtos/meal.dto';

@Injectable()
export class MealsService {

    constructor(
        @InjectRepository(Meal)
        private readonly mealRepository: Repository<Meal>,
        private readonly usersService: UsersService) { }


    async getAll(page: number = 1, pageSize: number = 10)
        : Promise<PaginationReponseDto<MealDto>> {
        const [data, totalItems] = await this.mealRepository.findAndCount({
            relations: ['owner'],
            skip: (page - 1) * pageSize,
            take: pageSize,
        });

        return PaginationReponseDto.create(data, page, pageSize, totalItems);
    }

    async getAllWithUserRating(page: number = 1, pageSize: number = 10, customerId: number)
    : Promise<any> {
        const queryBuilder = this.mealRepository.createQueryBuilder('meal')
        .leftJoinAndSelect('meal.ratings', 'rating', 'rating.customerId = :customerId', { customerId })
        .skip((page - 1) * pageSize)
        .take(pageSize);
        
      return await queryBuilder.getMany();
}

    async getAllByChefId(page: number = 1, pageSize: number = 10, chefId: number)
        : Promise<PaginationReponseDto<Meal>> {
        const [data, totalItems] = await this.mealRepository.findAndCount({
            relations: ['owner'],
            skip: (page - 1) * pageSize,
            take: pageSize,
            where: {
                owner: { id: chefId }
            }
        })

        return PaginationReponseDto.create(data, page, pageSize, totalItems);
    }

    async getById(id: number)
        : Promise<Meal | undefined> {
        return await this.mealRepository.findOneBy({ id });
    }

    async create(mealDto: CreateMealDto, ownerId: number)
        : Promise<Meal> {
        const owner = await this.usersService.getById(ownerId);

        if (!owner) {
            throw new NotFoundException(`Chef with ID ${ownerId} not found`);
        }

        const newMeal = new Meal();
        newMeal.name = mealDto.name;
        newMeal.imageLink = mealDto.imageLink;
        newMeal.description = mealDto.description;
        newMeal.owner = owner;

        return await this.mealRepository.save(newMeal);
    }
}
