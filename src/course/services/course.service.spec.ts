import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CacheModule,
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { NUMBER, STRING, VALIDATIONS } from '../../config/const';
import { Common } from '../../config/common/common';
import { CourseEntity } from './../entities/course.entity';
import { CourseResponse } from '../dtos/course.response.dto';
import { CourseService } from './course.service';
import { CourseDTO } from '../dtos/course.request.dto';
import { EnrollmentEntity } from '../entities/enrollment.entity';
import { LoggingUtils } from '../../logger/loggingUtils';

let courseDTO = new CourseDTO();

let courseEntity = new CourseEntity();

let enrollmentEntity = new EnrollmentEntity();
const returnMockCourses = [
  {
    course_id: 2,
    course_title: 'Test Course',
    course_description: 'test',
    enrollmentcount: '0',
  },
  {
    course_id: 3,
    course_title: 'Test Course1',
    course_description: 'test',
    enrollmentcount: '4',
  },
];
export const courseRepositoryMockFactory = jest.fn(() => ({
  save: jest.fn(() => courseEntity),
  find: jest.fn(() => courseEntity),
  findOne: jest.fn(() => courseEntity),
  createQueryBuilder: jest.fn().mockReturnThis(),
  leftJoin: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  groupBy: jest.fn().mockReturnThis(),
  getRawMany: jest.fn().mockResolvedValue(returnMockCourses),
})) as any;
export const enrollmentRepositoryMockFactory = jest.fn(() => ({
  save: jest.fn(() => enrollmentEntity),
  find: jest.fn(() => enrollmentEntity),
  findOne: jest.fn(() => enrollmentEntity),
  update: jest.fn(() => enrollmentEntity),
  delete: jest.fn(() => enrollmentEntity),
}));

describe('Test Course Service', () => {
  let courseEntityRepository: Repository<CourseEntity>;
  let courseService: CourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        Common,
        LoggingUtils,
        {
          provide: getRepositoryToken(CourseEntity),
          useClass: courseRepositoryMockFactory,
        },
        {
          provide: getRepositoryToken(EnrollmentEntity),
          useValue: enrollmentRepositoryMockFactory,
        },
      ],
      imports: [CacheModule.register({})],
    }).compile();

    courseEntityRepository = module.get<Repository<CourseEntity>>(
      getRepositoryToken(CourseEntity),
    );
    courseService = module.get<CourseService>(CourseService);
  });

  it('courseEntityRepository should be defined', () => {
    expect(courseEntityRepository).toBeDefined();
  });

  it('getAllCourses should return success response ', async () => {
    const result = await courseService.getAllCourses();
    expect(result).toEqual(returnMockCourses);
  });

  it('addNewCourse should return success response ', async () => {
    courseEntity.id = 1;
    courseEntity.title = 'Test Course';
    courseEntity.description = 'This is a test course';
    courseEntity.status = NUMBER.ONE;

    courseDTO.title = 'New Course';
    courseDTO.description = 'This is a new course';

    jest
      .spyOn(courseEntityRepository, 'findOne')
      .mockResolvedValueOnce(undefined);
    jest.spyOn(courseEntityRepository, 'save').mockResolvedValue(courseEntity);

    expect(await courseService.addNewCourse(courseDTO)).toEqual(courseEntity);
  });

  it('addNewCourse should throw error for duplicate course.', async () => {
    courseDTO.title = 'New Course';
    courseDTO.description = 'This is a new course';

    courseEntity.id = 1;
    courseEntity.title = 'Test Course';
    courseEntity.description = 'This is a test course';
    courseEntity.status = NUMBER.ONE;
    try {
      jest
        .spyOn(courseEntityRepository, 'findOne')
        .mockResolvedValueOnce(courseEntity);
      await courseService.addNewCourse(courseDTO);
    } catch (error) {
      expect(error.message).toBe(
        `${STRING.DUPLICATE_RECORD}.${STRING.ACTIVE_COURSE_EXIST}`,
      );
    }
  });
});
