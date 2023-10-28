import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { MealRatingsService } from '../services/meal-ratings.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/role.decorator';
import { UserRole } from '../../users/enums/roles.enum';
import { CreateMealRatingDto } from '../dtos/create.meal-rating.dto';
import { JwtGuard } from '../../auth/guards/jwt.guard';
import { MealRating } from '../entities/meal-rating.entity';
import { MealAverageDto } from '../dtos/meals-average.dto';

@Controller('meal-ratings')
@ApiTags('meal-ratings')
@ApiBearerAuth()
@UseGuards(JwtGuard)
export class MealRatingsController {
    constructor(
        private readonly mealRatingService: MealRatingsService
    ){}

    @Post()
    @UseGuards(RolesGuard)
    @Roles(UserRole.CUSTOMER)
    create(@Req() req, @Body() requestDto : CreateMealRatingDto)
    : Promise<MealRating> {
        const customerId = req.user.userId;
        return this.mealRatingService.create(requestDto.mealId, customerId, requestDto.rating);
    }

    @Get('chef-average')
    @UseGuards(RolesGuard)
    @Roles(UserRole.CHEF)
    getRatingAveragePerMeal(@Req() req) 
    : Promise<MealAverageDto[]> {
        const chefId = req.user.userId;
        return this.mealRatingService.getAverageRatingPerMeal(chefId);
    }
}
