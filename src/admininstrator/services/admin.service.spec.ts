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
import { AdminEntity } from './../entities/admin.entity';
import { AdminResponse } from '../dtos/admin.response.dto';
import { AdminService } from './admin.service';
import { AdminRequestDTO } from '../dtos/admin.request.dto';
import { LoggingUtils } from '../../logger/loggingUtils';

let adminRequestDTO = new AdminRequestDTO();

let adminEntity = new AdminEntity();
export const registeredApplicationRepositoryMockFactory = jest.fn(() => ({
  save: jest.fn(() => adminEntity),
  find: jest.fn(() => adminEntity),
  findOne: jest.fn(() => adminEntity),
  update: jest.fn(() => adminEntity),
}));
describe('Test Admin Service', () => {
  let adminEntityRepository: Repository<AdminEntity>;
  let adminService: AdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        Common,
        LoggingUtils,
        {
          provide: getRepositoryToken(AdminEntity),
          useClass: registeredApplicationRepositoryMockFactory,
        },
      ],
      imports: [CacheModule.register({})],
    }).compile();

    adminEntityRepository = module.get<Repository<AdminEntity>>(
      getRepositoryToken(AdminEntity),
    );
    adminService = module.get<AdminService>(AdminService);
  });

  it('adminEntityRepository should be defined', () => {
    expect(adminEntityRepository).toBeDefined();
  });
});
