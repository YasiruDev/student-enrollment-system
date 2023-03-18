import { CourseController } from './course.controller';
import { CourseService } from '../services/course.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpStatus } from '@nestjs/common/enums';
import { Common } from '../../config/common/common';
import { CourseEntity } from '../entities/course.entity';
import { EnrollmentEntity } from '../entities/enrollment.entity';
import { CourseDTO } from '../dtos/course.request.dto';
import { CourseResponse } from '../dtos/course.response.dto';
import { STRING } from '../../config/const';
import { LoggingUtils } from '../../logger/loggingUtils';

let courseEntity = new CourseEntity();
let enrollmentEntity = new EnrollmentEntity();
let courseDTO = new CourseDTO();
courseEntity.id = 1;
courseEntity.title = 'Test Course one';
courseEntity.maxCapacity = 5;
courseEntity.status = 1;
courseEntity.createdAt = new Date('CURRENT_TIMESTAMP()');
courseEntity.updatedAt = new Date('CURRENT_TIMESTAMP()');
let mockCourseList = [{ ...courseEntity, enrollments: 0 }];

export const courseRepositoryMockFactory = jest.fn(() => ({
  save: jest.fn(() => courseEntity),
  find: jest.fn(() => courseEntity),
  findOne: jest.fn(() => courseEntity),
  update: jest.fn(() => courseEntity),
  delete: jest.fn(() => courseEntity),
}));

export const enrollmentRepositoryMockFactory = jest.fn(() => ({
  save: jest.fn(() => enrollmentEntity),
  find: jest.fn(() => enrollmentEntity),
  findOne: jest.fn(() => enrollmentEntity),
  update: jest.fn(() => enrollmentEntity),
  delete: jest.fn(() => enrollmentEntity),
}));
describe('CourseController', () => {
  let courseService: CourseService;
  let courseController: CourseController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseController],
      providers: [
        CourseService,
        Common,
        LoggingUtils,
        {
          provide: getRepositoryToken(CourseEntity),
          useValue: courseRepositoryMockFactory,
        },
        {
          provide: getRepositoryToken(EnrollmentEntity),
          useValue: enrollmentRepositoryMockFactory,
        },
      ],
    }).compile();

    courseController = module.get<CourseController>(CourseController);
    courseService = module.get<CourseService>(CourseService);
  });

  it('courseController  should be defined', () => {
    expect(courseController).toBeDefined();
  });

  it('courseService  should be defined', () => {
    expect(courseService).toBeDefined();
  });

  it('courseController getAllCourses should be return data', async () => {
    const mockSuccessResponse = new CourseResponse(
      HttpStatus.OK,
      STRING.SUCCESS,
      `${STRING.SUCCESSFULLY} ${STRING.FETCH_RECORD}`,
      mockCourseList,
    );
    jest
      .spyOn(courseService, 'getAllCourses')
      .mockResolvedValueOnce(mockCourseList);

    const res = await courseController.courseList();

    expect(res).toBeDefined();
    expect(res).toEqual(mockSuccessResponse);
  });

  it('courseController addNewCourse should be success', async () => {
    const mockSuccessResponse = new CourseResponse(
      HttpStatus.OK,
      STRING.SUCCESS,
      `${STRING.SUCCESSFULLY} ${STRING.ADD_NEW_RECORD}`,
      courseEntity,
    );
    jest
      .spyOn(courseService, 'addNewCourse')
      .mockResolvedValueOnce(courseEntity);

    const res = await courseController.addNewCourse(courseDTO);

    expect(res).toBeDefined();
    expect(res).toEqual(mockSuccessResponse);
  });
});
