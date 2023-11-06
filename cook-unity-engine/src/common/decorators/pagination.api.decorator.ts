import { Type, applyDecorators } from "@nestjs/common";
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";
import { PaginationReponseDto } from "../dtos/pagination.response.dto";

export const ApiPaginatedResponse = <TModel extends Type<any>>(
    model: TModel,
  ) => {
    return applyDecorators(
      ApiExtraModels(model),
      ApiOkResponse({
        schema: {
          allOf: [
            { $ref: getSchemaPath(PaginationReponseDto) },
            {
              properties: {
                data: {
                  type: 'array',
                  items: { $ref: getSchemaPath(model) },
                },
                page: {
                    type: 'number'
                },
                pageSize: {
                    type: 'number'
                },
                totalItems: {
                    type: 'number'
                },
              },
            },
          ],
        },
      }),
    );
  };