import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { MealsService } from '../services/meals.service';
import { Meal } from '../entities/meal.entity';
import { PaginationReponseDto } from '../../common/dtos/pagination.response.dto';
import { PaginationRequestDto } from '../../common/dtos/pagination.request.dto';
import { MealDto } from '../dtos/meal.dto';
import { JwtGuard } from '../../auth/guards/jwt.guard';
import { UserRole } from '../../users/enums/roles.enum';
import { Roles } from '../../auth/role.decorator';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';


@Controller('meals')
@ApiTags('meals')
@ApiBearerAuth()
@UseGuards(JwtGuard)
export class MealsController {
    constructor(private readonly mealsService: MealsService) { }

    @Get()
    async getAll(
        @Query() paginationRequestDto: PaginationRequestDto,
        @Req() req
    ): Promise<PaginationReponseDto<Meal>> {
        if (req.user.role === UserRole.CHEF)
            return await this.mealsService.getAllByChefId(paginationRequestDto.page, paginationRequestDto.pageSize, req.user.userId);

        return await this.mealsService.getAll(paginationRequestDto.page, paginationRequestDto.pageSize);

    }

    @Get('with-user-ratings')
    @UseGuards(RolesGuard)
    @Roles(UserRole.CUSTOMER)
    async getAllWithUserRating(
        @Query() paginationRequestDto: PaginationRequestDto,
        @Req() req
    ): Promise<PaginationReponseDto<Meal>> {
        const customerId = req.user.userId;
        const meals = await this.mealsService.getAllWithUserRating(paginationRequestDto.page, paginationRequestDto.pageSize, customerId);
        return meals;
    }

    @Get('by-chef-id')
    @UseGuards(RolesGuard)
    @Roles(UserRole.CUSTOMER)
    @ApiQuery({ name: 'chefId', type: Number})
    async getAllByChef(
        @Query() paginationRequestDto: PaginationRequestDto,        
        @Query() chefId: number
    ): Promise<PaginationReponseDto<Meal>> {
        const meals = await this.mealsService.getAllByChefId(paginationRequestDto.page, paginationRequestDto.pageSize, chefId);
        return meals;
    }

    @Post()
    @Roles(UserRole.CHEF)
    @UseGuards(RolesGuard)
    async create(
        @Body() mealDto: MealDto,
        @Req() req
    ): Promise<Meal> {
        const ownerId = req.user.userId;
        const meal = await this.mealsService.create(mealDto, ownerId);
        
        return { ...meal, owner: ownerId };
    }
}
