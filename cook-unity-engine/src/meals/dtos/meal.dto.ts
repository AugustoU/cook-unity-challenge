import { ApiProperty } from "@nestjs/swagger";
import { MealOwnerDto } from "./meal-owner.dto";

export class MealDto{
    @ApiProperty()
    id: number
    @ApiProperty()
    name: string
    @ApiProperty()
    imageLink: string
    @ApiProperty()
    description: string
    @ApiProperty()
    owner: MealOwnerDto
}
