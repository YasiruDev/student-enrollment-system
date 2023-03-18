import {
  Controller,
  UseInterceptors,
  Get,
  Post,
  Body,
  HttpException,
  Param,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { LOG_FILE, LOG_TITLE, LOG_TYPE, STRING } from '../../config/const';
import { ErrorInterceptor } from '../../interceptors/errors/error.interceptor';
import { LoggingUtils } from '../../logger/loggingUtils';
import { CourseDTO } from '../dtos/course.request.dto';
import { CourseResponse } from '../dtos/course.response.dto';
import { EnrollDTO } from '../dtos/enroll.dto';
import { CourseService } from '../services/course.service';

@UseInterceptors(ErrorInterceptor)
@Controller('course')
export class CourseController {
  constructor(
    private logger: LoggingUtils,
    private courseService: CourseService,
  ) {}

  @Post()
  async addNewCourse(@Body() courseDTO: CourseDTO): Promise<CourseResponse> {
    this.logger.info(
      `${LOG_FILE.COURSE_CONTROLLER}|${LOG_TITLE.ADD_NEW_COURSE}|${
        LOG_TYPE.REQUEST
      }|${JSON.stringify(courseDTO)}`,
    );

    const data = await this.courseService.addNewCourse(courseDTO);

    this.logger.info(
      `${LOG_FILE.COURSE_CONTROLLER}|${LOG_TITLE.ADD_NEW_COURSE}|${
        LOG_TYPE.RESPONSE
      }| ${JSON.stringify(data)}`,
    );

    return new CourseResponse(
      HttpStatus.OK,
      STRING.SUCCESS,
      `${STRING.SUCCESSFULLY} ${STRING.ADD_NEW_RECORD}`,
      data,
    );
  }

  @Get()
  async courseList(): Promise<CourseResponse> {
    this.logger.info(
      `${LOG_FILE.COURSE_CONTROLLER}|${LOG_TITLE.COURSE_LIST}|${LOG_TYPE.REQUEST}`,
    );

    const data = await this.courseService.getAllCourses();

    this.logger.info(
      `${LOG_FILE.COURSE_CONTROLLER}|${LOG_TITLE.COURSE_LIST}|${
        LOG_TYPE.RESPONSE
      }| ${JSON.stringify(data)}`,
    );

    return new CourseResponse(
      HttpStatus.OK,
      STRING.SUCCESS,
      `${STRING.SUCCESSFULLY} ${STRING.FETCH_RECORD}`,
      data,
    );
  }

  @Get(':id/students')
  async getStudentsEnrolledInCourse(
    @Param('id') id: number,
  ): Promise<CourseResponse> {
    this.logger.info(
      `${LOG_FILE.COURSE_CONTROLLER}|${LOG_TITLE.COURSE_LIST}|${LOG_TYPE.REQUEST}`,
    );

    const data = await this.courseService.getEnrollmentsByCourse(id);

    this.logger.info(
      `${LOG_FILE.COURSE_CONTROLLER}|${LOG_TITLE.COURSE_LIST}|${
        LOG_TYPE.RESPONSE
      }| ${JSON.stringify(data)}`,
    );

    return new CourseResponse(
      HttpStatus.OK,
      STRING.SUCCESS,
      `${STRING.SUCCESSFULLY} ${STRING.FETCH_RECORD}`,
      data,
    );
  }

  @Post('/enroll')
  async enrollCourse(@Body() enrollDTO: EnrollDTO): Promise<CourseResponse> {
    this.logger.info(
      `${LOG_FILE.COURSE_CONTROLLER}|${LOG_TITLE.ADD_NEW_COURSE}|${
        LOG_TYPE.REQUEST
      }|${JSON.stringify(enrollDTO)}`,
    );

    const data = await this.courseService.enrollCourse(enrollDTO);

    this.logger.info(
      `${LOG_FILE.COURSE_CONTROLLER}|${LOG_TITLE.ADD_NEW_COURSE}|${
        LOG_TYPE.RESPONSE
      }| ${JSON.stringify(data)}`,
    );

    return new CourseResponse(
      HttpStatus.OK,
      STRING.SUCCESS,
      `${STRING.SUCCESSFULLY} ${STRING.ENROLLED_SUCCESS}`,
      data,
    );
  }

  @Post('/drop')
  async dropCourse(@Body() enrollDTO: EnrollDTO): Promise<CourseResponse> {
    this.logger.info(
      `${LOG_FILE.COURSE_CONTROLLER}|${LOG_TITLE.ADD_NEW_COURSE}|${
        LOG_TYPE.REQUEST
      }|${JSON.stringify(enrollDTO)}`,
    );

    const data = await this.courseService.dropCourse(enrollDTO);

    this.logger.info(
      `${LOG_FILE.COURSE_CONTROLLER}|${LOG_TITLE.ADD_NEW_COURSE}|${
        LOG_TYPE.RESPONSE
      }| ${JSON.stringify(data)}`,
    );

    return new CourseResponse(
      HttpStatus.OK,
      STRING.SUCCESS,
      `${STRING.SUCCESSFULLY} ${STRING.DIS_ENROLLED_SUCCESS}`,
      data,
    );
  }
}
