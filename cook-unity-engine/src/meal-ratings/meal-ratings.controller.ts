import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { MealRatingsService } from './meal-ratings.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/role.decorator';
import { UserRole } from 'src/auth/roles.enum';
import { CreateMealRatingDto } from './dtos/create.meal-rating.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

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
    create(@Req() req, @Body() requestDto : CreateMealRatingDto){
        const customerId = req.user.userId;
        return this.mealRatingService.create(requestDto.mealId, customerId, requestDto.rating);
    }

    @Get('chef-average')
    @UseGuards(RolesGuard)
    @Roles(UserRole.CHEF)
    getRatingAveragePerMeal(@Req() req){
        const chefId = req.user.userId;
        return this.mealRatingService.getAverageRatingPerMeal(chefId);
    }
}
