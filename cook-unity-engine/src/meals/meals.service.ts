import { Injectable, NotFoundException } from '@nestjs/common';
import { Meal } from './entities/meal.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationReponseDto } from 'src/common/dtos/pagination.response.dto';
import { MealDto } from './dtos/meal.dto';
import User from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class MealsService {

    constructor(
        @InjectRepository(Meal)
        private readonly mealRepository: Repository<Meal>,
        private readonly usersService: UsersService) { }



    async getAll(page: number = 1, pageSize: number = 10)
    : Promise<PaginationReponseDto<Meal>> {
        const [data, totalItems] = await this.mealRepository.findAndCount({
            skip: (page - 1) * pageSize,
            take: pageSize,
        });

        return PaginationReponseDto.create(data, page, pageSize, totalItems);
    }

    async getByChefId(page: number = 1, pageSize: number = 10, chefId: number)
    : Promise<PaginationReponseDto<Meal>> {
        const [data, totalItems] = await this.mealRepository.findAndCount({
            skip: (page - 1) * pageSize,
            take: pageSize,
            where: {
                owner: { id: chefId }
            }
        })

        return PaginationReponseDto.create(data, page, pageSize, totalItems);
    }

    async create(mealDto: MealDto, ownerId: number)
    : Promise<Meal> {
        const owner = await this.usersService.getById(ownerId);

        if (!owner) {
            throw new NotFoundException(`Chef with ID ${ownerId} not found`);
        }

        const newMeal = new Meal();
        newMeal.imageLink = mealDto.imageLink;
        newMeal.description = mealDto.description;
        newMeal.owner = owner;

        return await this.mealRepository.save(newMeal);
    }
}
