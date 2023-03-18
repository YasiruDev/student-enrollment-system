import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as _ from 'lodash';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggingUtils } from '../../logger/loggingUtils';
import { CourseEntity } from '../entities/course.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import {
  LOG_FILE,
  LOG_TITLE,
  LOG_TYPE,
  NUMBER,
  STRING,
} from '../../config/const';
import { Common } from '../../config/common/common';
import { EnrollmentEntity } from '../entities/enrollment.entity';
import { CourseDTO } from '../dtos/course.request.dto';
import { EnrollDTO } from '../dtos/enroll.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private courseRepository: Repository<CourseEntity>,
    @InjectRepository(EnrollmentEntity)
    private enrollmentRepository: Repository<EnrollmentEntity>,
    private logger: LoggingUtils,
  ) {}

  async addNewCourse(courseDTO: CourseDTO) {
    try {
      //Check duplicate records exist for the given course
      const data = await this.courseRepository.findOne({
        title: courseDTO.title,
        status: NUMBER.ONE,
      });

      if (data) {
        throw new HttpException(
          `${STRING.DUPLICATE_RECORD}.${STRING.ACTIVE_COURSE_EXIST}`,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        const newCourse = await this.courseRepository.save({
          ...courseDTO,
          status: NUMBER.ONE,
        });
        return newCourse;
      }
    } catch (error) {
      this.logger.error(
        `${LOG_FILE.COURSE_SERVICE}|${LOG_TITLE.ADD_NEW_COURSE}|${
          LOG_TYPE.ERROR
        }| ${JSON.stringify(error)}`,
      );
      throw new HttpException(error.message, error.status);
    }
  }

  async getAllCourses() {
    try {
      let data = this.courseRepository
        .createQueryBuilder('course')
        .leftJoin(
          'course.enrollments',
          'enrollment',
          'enrollment.status = :status',
          { status: NUMBER.ONE },
        )
        .select([
          'course.id',
          'course.title',
          'course.description',
          'COUNT(enrollment.id) as enrollmentCount',
        ])
        .groupBy('course.id')
        .getRawMany();

      return data;
    } catch (error) {
      await this.logger.error(
        `${LOG_FILE.COURSE_SERVICE}|${LOG_TITLE.COURSE_LIST}|${
          LOG_TYPE.ERROR
        } ${JSON.stringify(error)}`,
      );
      throw new HttpException(error.message, error.status);
    }
  }

  async getEnrollmentsByCourse(courseId: number) {
    try {
      let data = await this.enrollmentRepository.find({
        where: { courseId },
        relations: ['student'],
      });

      data = _.map(data, (e) => {
        return e.student;
      });

      return data;
    } catch (error) {
      await this.logger.error(
        `${LOG_FILE.COURSE_SERVICE}|${LOG_TITLE.COURSE_LIST}|${
          LOG_TYPE.ERROR
        } ${JSON.stringify(error)}`,
      );
      throw new HttpException(error.message, error.status);
    }
  }

  async enrollCourse(enrollDTO: EnrollDTO) {
    try {
      const { courseId, studentId } = enrollDTO;

      let data = await this._enrollmentsByCourseId(courseId);

      //check requested course is exist in db.if not,showing error
      if (!data) {
        throw new HttpException(`${STRING.NO_COURSE}.`, HttpStatus.NOT_FOUND);
      }

      //if course enrollemets reach maxCap,showing error
      if (data.enrollments.length >= data.maxCapacity) {
        throw new HttpException(`${STRING.COURSE_FULL}.`, HttpStatus.NOT_FOUND);
      }

      //if student allready registered for the course,show error
      const enrolledData = await this._enrollmentsByCourseIdAndStudentId(
        courseId,
        studentId,
      );
      if (enrolledData) {
        throw new HttpException(
          `${STRING.ALLREADY_ENROLL}.`,
          HttpStatus.NOT_FOUND,
        );
      }

      const enrollment = new EnrollmentEntity();
      enrollment.studentId = studentId;
      enrollment.courseId = courseId;
      enrollment.status = NUMBER.ONE;
      enrollment.enrolledDate = new Date();

      await this.enrollmentRepository.save(enrollment);

      return enrollDTO;
    } catch (error) {
      await this.logger.error(
        `${LOG_FILE.COURSE_SERVICE}|${LOG_TITLE.COURSE_LIST}|${
          LOG_TYPE.ERROR
        } ${JSON.stringify(error)}`,
      );
      throw new HttpException(error.message, error.status);
    }
  }

  async dropCourse(enrollDTO: EnrollDTO) {
    try {
      const { courseId, studentId } = enrollDTO;

      let data = await this._enrollmentsByCourseId(courseId);

      //check requested course is exist in db.if not,showing error
      if (!data) {
        throw new HttpException(`${STRING.NO_COURSE}.`, HttpStatus.NOT_FOUND);
      }

      //if student allready registered for the course,show error
      const enrolledData = await this._enrollmentsByCourseIdAndStudentId(
        courseId,
        studentId,
      );
      if (!enrolledData) {
        throw new HttpException(
          `${STRING.ENROLL_NOT_FOUND}.`,
          HttpStatus.NOT_FOUND,
        );
      }

      enrolledData.status = NUMBER.ZERO;
      enrolledData.dropedDate = new Date();

      await this.enrollmentRepository.save(enrolledData);

      return enrollDTO;
    } catch (error) {
      await this.logger.error(
        `${LOG_FILE.COURSE_SERVICE}|${LOG_TITLE.COURSE_LIST}|${
          LOG_TYPE.ERROR
        } ${JSON.stringify(error)}`,
      );
      throw new HttpException(error.message, error.status);
    }
  }

  async _enrollmentsByCourseId(courseId: number) {
    try {
      const data = await this.courseRepository.findOne(courseId, {
        relations: ['enrollments'],
      });
      return data;
    } catch (error) {
      await this.logger.error(
        `${LOG_FILE.COURSE_SERVICE}|${LOG_TITLE.ENROLL_BY_COURSE}|${
          LOG_TYPE.ERROR
        } ${JSON.stringify(error)}`,
      );
      throw new HttpException(error.message, error.status);
    }
  }

  async _enrollmentsByCourseIdAndStudentId(
    courseId: number,
    studentId: number,
  ) {
    try {
      const data = await this.enrollmentRepository.findOne({
        courseId,
        studentId,
        status: NUMBER.ONE,
      });
      return data;
    } catch (error) {
      await this.logger.error(
        `${LOG_FILE.COURSE_SERVICE}|${LOG_TITLE.ENROLL_BY_STUDENT}|${
          LOG_TYPE.ERROR
        } ${JSON.stringify(error)}`,
      );
      throw new HttpException(error.message, error.status);
    }
  }
}
