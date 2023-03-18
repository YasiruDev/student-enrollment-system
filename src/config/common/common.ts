import * as jwt from 'jsonwebtoken';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { TOKEN_KEY, VALIDATIONS } from '../const';

export class Common {
  signToken(payload: any) {
    try {
      // Best approch is use private,public key pair to generate and verify token
      return jwt.sign(payload, TOKEN_KEY);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  verifyToken(token: string) {
    try {
      return jwt.verify(token, TOKEN_KEY);
    } catch (error) {
      throw new HttpException(
        VALIDATIONS.INVALID_TOKEN,
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
