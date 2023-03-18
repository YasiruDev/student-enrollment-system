import {
  HttpStatus,
  HttpException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { VALIDATIONS } from '../config/const';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req?.headers?.token;
    try {
      if (token) {
        //token verification can implement here
        next();
      } else {
        throw new HttpException(
          VALIDATIONS.UN_AUTHERIZED,
          HttpStatus.UNAUTHORIZED,
        );
      }
    } catch (error) {
      throw new HttpException(
        VALIDATIONS.UN_AUTHERIZED,
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
