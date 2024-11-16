
import { createParamDecorator, NotAcceptableException, ExecutionContext } from '@nestjs/common';

export const SortQuery = createParamDecorator(
  (allowedFields: string[], ctx: ExecutionContext): Record<string, string> => {
    const allowedDirections = ['asc', 'desc']
    const request = ctx.switchToHttp().getRequest();
    const sortString = request.query.sort as string;
    if (!sortString) return {};

    const sortValues = sortString.split(",")
    
    let result = {}
    sortValues.forEach(sort => {
      const [field, direction] =  sort.split(":")

      if (!allowedDirections.includes(direction)) {
        throw new NotAcceptableException('Invalid sort direction, allowed(asc|desc)')
      }

      if (!allowedFields.includes(field)) {
        throw new NotAcceptableException(`Invalid sort field: ${field}, allowed: [${allowedFields}]`)
      }

      result[field] = direction
    })


    return result
  },
);
