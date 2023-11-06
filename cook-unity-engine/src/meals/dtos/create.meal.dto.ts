import { ApiProperty } from "@nestjs/swagger";

export class CreateMealDto{
    @ApiProperty()
    name: string;
    @ApiProperty()
    imageLink: string;
    @ApiProperty()
    description: string;
}