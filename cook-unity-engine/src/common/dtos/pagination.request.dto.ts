import { ApiProperty } from "@nestjs/swagger"

export class PaginationRequestDto {
    @ApiProperty()
    page: number
    @ApiProperty()
    pageSize: number
}