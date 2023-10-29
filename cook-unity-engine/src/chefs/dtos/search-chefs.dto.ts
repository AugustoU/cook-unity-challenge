import { ApiProperty } from "@nestjs/swagger";

export class SeachChefsDto{
    @ApiProperty()
    nameStartsWith: string
}