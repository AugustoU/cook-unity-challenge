import { ApiProperty } from "@nestjs/swagger";

export class PaginationReponseDto<T> {
    @ApiProperty()
    data: T[];
    @ApiProperty()
    page: number;
    @ApiProperty()
    pageSize: number;
    @ApiProperty()
    totalItems: number;


    constructor(data: T[], page: number, pageSize: number, totalItems: number) {
        this.data = data;
        this.page = page;
        this.pageSize = pageSize;
        this.totalItems = totalItems;
    }
    
    static create<T>(data: T[], page: number, pageSize: number, totalItems: number): PaginationReponseDto<T> {
        return new PaginationReponseDto(data, page, pageSize, totalItems);
    }
}