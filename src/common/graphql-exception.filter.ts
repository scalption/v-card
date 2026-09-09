import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Catch(HttpException)
export class GraphqlExceptionFilter implements GqlExceptionFilter {
  catch(exception: HttpException, _host: ArgumentsHost): GraphQLError {
    const status = exception.getStatus();

    return new GraphQLError(exception.message, {
      extensions: {
        code: HTTP_STATUS_TO_GRAPHQL_CODE[status] ?? 'INTERNAL_SERVER_ERROR',
        httpStatus: status,
      },
    });
  }
}

const HTTP_STATUS_TO_GRAPHQL_CODE: Record<number, string> = {
  400: 'BAD_REQUEST',
  401: 'UNAUTHENTICATED',
  403: 'FORBIDDEN',
  404: 'NOT_FOUND',
  409: 'CONFLICT',
};
