export class PaginationReponseDto<T> {
    data: T[];
    page: number;
    pageSize: number;
    totalItems: number;
}