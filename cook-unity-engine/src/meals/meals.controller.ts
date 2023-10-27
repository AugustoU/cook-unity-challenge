import { Body, Controller, Get, NotFoundException, Param, Post, Query } from '@nestjs/common';
import { MealsService } from './meals.service';
import { Meal } from './entities/meal.entity';
import { PaginationReponseDto } from 'src/common/dtos/pagination.response.dto';
import { PaginationRequestDto } from 'src/common/dtos/pagination.request.dto';
import { MealDto } from './dtos/meal.dto';

@Controller('meals')
export class MealsController {
    constructor(private readonly mealsService: MealsService) {}

    @Get()
    async getAll(
       @Query() paginationRequestDto: PaginationRequestDto
    ): Promise<PaginationReponseDto<Meal>> {
      const meals = await this.mealsService.getAll(paginationRequestDto.page, paginationRequestDto.pageSize);
      return meals;
    }
  
    // @Get('chef/:chefId')
    // async getByChefId(
    //   @Param('chefId', ParseIntPipe) chefId: number,
    //   @Query('page', ParseIntPipe) page: number = 1,
    //   @Query('pageSize', ParseIntPipe) pageSize: number = 10,
    // ): Promise<PaginationReponseDto<Meal>> {
    //   const meals = await this.mealsService.getByChefId(chefId, page, pageSize);
    //   return meals;
    // }
  
    @Post(':ownerId')
    async create(
      @Body() mealDto: MealDto,
      @Param('ownerId') ownerId: number,
    ): Promise<Meal> {
      try {
        const meal = await this.mealsService.create(mealDto, ownerId);
        return meal;
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
}
