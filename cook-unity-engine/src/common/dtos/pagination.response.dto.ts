export class PaginationReponseDto<T> {
    data: T[];
    page: number;
    pageSize: number;
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