import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CacheModule,
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { STRING, VALIDATIONS } from '../../config/const';
import { Common } from '../../config/common/common';
import { StudentEntity } from './../entities/student.entity';
import { StudentResponse } from '../dtos/student.response.dto';
import { StudentService } from './student.service';
import { StudentRequestDTO } from '../dtos/student.request.dto';
import { LoggingUtils } from '../../logger/loggingUtils';

let studentRequestDTO = new StudentRequestDTO();

let studentEntity = new StudentEntity();
export const registeredApplicationRepositoryMockFactory = jest.fn(() => ({
  save: jest.fn(() => studentEntity),
  find: jest.fn(() => studentEntity),
  findOne: jest.fn(() => studentEntity),
  update: jest.fn(() => studentEntity),
}));
describe('Test Admin Service', () => {
  let studentEntityRepository: Repository<StudentEntity>;
  let studentService: StudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        Common,
        LoggingUtils,
        {
          provide: getRepositoryToken(StudentEntity),
          useClass: registeredApplicationRepositoryMockFactory,
        },
      ],
      imports: [CacheModule.register({})],
    }).compile();

    studentEntityRepository = module.get<Repository<StudentEntity>>(
      getRepositoryToken(StudentEntity),
    );
    studentService = module.get<StudentService>(StudentService);
  });

  it('studentEntityRepository should be defined', () => {
    expect(studentEntityRepository).toBeDefined();
  });
});
