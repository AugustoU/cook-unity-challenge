import { ApiProperty } from "@nestjs/swagger";

export class MealDto{
    @ApiProperty()
    name: string;
    @ApiProperty()
    imageLink: string;
    @ApiProperty()
    description: string;
}