import { StudentController } from './student.controller';
import { StudentService } from '../services/student.service';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Common } from '../../config/common/common';
import { StudentEntity } from '../entities/student.entity';
import { StudentRequestDTO } from '../dtos/student.request.dto';
import { StudentResponse } from '../dtos/student.response.dto';
import { STRING } from '../../config/const';
import { LoggingUtils } from '../../logger/loggingUtils';

let common = new Common();
let studentEntity = new StudentEntity();
let studentRequestDTO = new StudentRequestDTO();

export const registeredApplicationRepositoryMockFactory = jest.fn(() => ({
  save: jest.fn(() => studentEntity),
  find: jest.fn(() => studentEntity),
  findOne: jest.fn(() => studentEntity),
  update: jest.fn(() => studentEntity),
  delete: jest.fn(() => studentEntity),
}));

describe('StudentController', () => {
  let studentService: StudentService;
  let studentController: StudentController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [
        StudentService,
        Common,
        LoggingUtils,
        {
          provide: getRepositoryToken(StudentEntity),
          useValue: registeredApplicationRepositoryMockFactory,
        },
      ],
    }).compile();

    studentController = module.get<StudentController>(StudentController);
    studentService = module.get<StudentService>(StudentService);
  });

  it('studentController  should be defined', () => {
    expect(studentController).toBeDefined();
  });

  it('studentService  should be defined', () => {
    expect(studentService).toBeDefined();
  });
});
