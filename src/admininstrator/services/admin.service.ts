import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggingUtils } from '../../logger/loggingUtils';
import { AdminEntity } from '../entities/admin.entity';
import { Repository } from 'typeorm';
import { LOG_FILE, LOG_TITLE, LOG_TYPE, STRING } from '../../config/const';
import { Common } from '../../config/common/common';
import { AdminDTO } from '../dtos/admin.request.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private adminRepository: Repository<AdminEntity>,
    private logger: LoggingUtils,
    private commonHelper: Common,
  ) {}

  async adminLogin(adminDTO: AdminDTO) {
    try {
      //Authentication process can improve using encripted password
      const data = await this.adminRepository.findOne(adminDTO);
      if (!data) {
        throw new HttpException(
          `${STRING.INVALID} ${STRING.USER}`,
          HttpStatus.BAD_REQUEST,
        );
      }
      // token generate process can improve adding expire time and private,public key pair
      const jwtPayload = {
        data: {
          email: adminDTO.email,
        },
      };

      const jwtToken = this.commonHelper.signToken(jwtPayload);

      data.token = jwtToken;
      await this.adminRepository.save(data);

      return { jwtToken };
    } catch (error) {
      this.logger.error(
        `${LOG_FILE.ADMIN_SERVICE}|${LOG_TITLE.ADMIN_LOGIN}|${
          LOG_TYPE.ERROR
        }| ${JSON.stringify(error)}`,
      );
      throw new HttpException(error.message, error.status);
    }
  }
}
