import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  HttpException,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {  VALIDATIONS } from '../../config/const';

export interface Response<T> {
  statusCode: number;
  friendlyMessage: string;
  message: string;
  data: T;
}

@Injectable()
export class ErrorInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      catchError(error => {
        throw new HttpException(
          error.message ? error.message : VALIDATIONS.INTERNAL_SERVER_ERROR,
          error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }),
    );
  }
}
