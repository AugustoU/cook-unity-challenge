import { ApiProperty } from "@nestjs/swagger";

export class MealAverageDto{
    @ApiProperty()
    mealId: number;
    @ApiProperty()
    average: number;
}