import { Controller, UseInterceptors, Body, Post } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { LOG_FILE, LOG_TITLE, LOG_TYPE, STRING } from '../../config/const';
import { ErrorInterceptor } from '../../interceptors/errors/error.interceptor';
import { LoggingUtils } from '../../logger/loggingUtils';
import { StudentDTO } from '../dtos/student.request.dto';
import { StudentResponse } from '../dtos/student.response.dto';
import { StudentService } from '../services/student.service';

@UseInterceptors(ErrorInterceptor)
@Controller('student')
export class StudentController {
  constructor(
    private logger: LoggingUtils,
    private studentService: StudentService,
  ) {}

  @Post()
  async regStudent(@Body() studentDTO: StudentDTO): Promise<StudentResponse> {
    this.logger.info(
      `${LOG_FILE.STUDENT_CONTROLLER}|${LOG_TITLE.REG_STUDENT}|${
        LOG_TYPE.REQUEST
      }|${JSON.stringify(studentDTO)}`,
    );
    const data = await this.studentService.registerNewStudent(studentDTO);
    this.logger.info(
      `${LOG_FILE.STUDENT_CONTROLLER}|${LOG_TITLE.REG_STUDENT}|${
        LOG_TYPE.RESPONSE
      }| ${JSON.stringify(data)}`,
    );

    return new StudentResponse(
      HttpStatus.OK,
      STRING.SUCCESS,
      `${STRING.USER} ${STRING.CREATE} ${STRING.SUCCESS}`,
      data,
    );
  }
}
