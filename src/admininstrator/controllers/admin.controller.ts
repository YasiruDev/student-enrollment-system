import {
  Controller,
  UseInterceptors,
  Body,
  Post,
  HttpException,
} from '@nestjs/common';
import { ErrorInterceptor } from '../../interceptors/errors/error.interceptor';
import { LoggingUtils } from '../../logger/loggingUtils';
import { AdminService } from '../services/admin.service';
import { AdminDTO } from '../dtos/admin.request.dto';
import { AdminResponse } from '../dtos/admin.response.dto';
import { LOG_FILE, LOG_TITLE, LOG_TYPE, STRING } from '../../config/const';
import { HttpStatus } from '@nestjs/common/enums';

@UseInterceptors(ErrorInterceptor)
@Controller('admin')
export class AdminController {
  constructor(
    private logger: LoggingUtils,
    private adminService: AdminService,
  ) {}

  @Post()
  async adminLogin(@Body() adminDTO: AdminDTO): Promise<AdminResponse> {
    this.logger.info(
      `${LOG_FILE.ADMIN_CONTROLLER}|${LOG_TITLE.ADMIN_LOGIN}|${
        LOG_TYPE.REQUEST
      }|${JSON.stringify(adminDTO)}`,
    );
    const data = await this.adminService.adminLogin(adminDTO);
    this.logger.info(
      `${LOG_FILE.ADMIN_CONTROLLER}|${LOG_TITLE.ADMIN_LOGIN}|${
        LOG_TYPE.RESPONSE
      }| ${JSON.stringify(data)}`,
    );

    return new AdminResponse(
      HttpStatus.OK,
      STRING.SUCCESS,
      `${STRING.LOG_IN}  ${STRING.SUCCESS}`,
      data,
    );
  }
}
