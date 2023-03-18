import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as _ from 'lodash';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggingUtils } from '../../logger/loggingUtils';
import { StudentEntity } from '../entities/student.entity';
import { Repository } from 'typeorm';
import {
  LOG_FILE,
  LOG_TITLE,
  LOG_TYPE,
  NUMBER,
  STRING,
} from '../../config/const';
import { Common } from '../../config/common/common';
import { StudentResponse } from '../dtos/student.response.dto';
import { StudentDTO } from '../dtos/student.request.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
    private logger: LoggingUtils,
  ) {}

  //get all merchants
  async registerNewStudent(studentDTO: StudentDTO) {
    try {
      const { name, email, password } = studentDTO;
      const data = await this.studentRepository.find({
        email,
        status: NUMBER.ONE,
      });
      if (data) {
        throw new HttpException(
          `${STRING.DUPLICATE_RECORD}.${STRING.USER_EXIST}`,
          HttpStatus.BAD_REQUEST,
        );
      }
      const studentEntity = new StudentEntity();
      studentEntity.name = name;
      studentEntity.email = email;
      studentEntity.password = password;
      await this.studentRepository.save(studentEntity);

      return studentDTO;
    } catch (error) {
      this.logger.error(
        `${LOG_FILE.STUDENT_SERVICE}|${LOG_TITLE.REG_STUDENT}|${
          LOG_TYPE.ERROR
        }| ${JSON.stringify(error)}`,
      );
      throw new HttpException(error.message, error.status);
    }
  }
}
