import { ApiProperty } from "@nestjs/swagger"

export class CreateMealRatingDto{
    @ApiProperty()
    mealId:number
    @ApiProperty()
    rating:number
}