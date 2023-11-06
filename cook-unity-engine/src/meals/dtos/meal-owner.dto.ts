import { ApiProperty } from "@nestjs/swagger"

export class MealOwnerDto{
    @ApiProperty()
    id: number
    @ApiProperty()
    name: string
}