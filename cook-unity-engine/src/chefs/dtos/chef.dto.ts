import { ApiProperty } from "@nestjs/swagger";

export class ChefDto{
    @ApiProperty()
    id: number
    @ApiProperty()
    name:string
}