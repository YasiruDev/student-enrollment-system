import { AdminController } from './admin.controller';
import { AdminService } from '../services/admin.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Common } from '../../config/common/common';
import { AdminEntity } from '../entities/admin.entity';
import { LoggingUtils } from '../../logger/loggingUtils';
import { AdminResponse } from '../dtos/admin.response.dto';
import { HttpStatus } from '@nestjs/common/enums';
import { STRING } from '../../config/const';
import { AdminDTO } from '../dtos/admin.request.dto';

let adminEntity = new AdminEntity();
const adminDTO = new AdminDTO();
const mockLoginResponse = {
  jwtToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWls',
};
export const registeredApplicationRepositoryMockFactory = jest.fn(() => ({
  save: jest.fn(() => adminEntity),
  find: jest.fn(() => adminEntity),
  findOne: jest.fn(() => adminEntity),
  update: jest.fn(() => adminEntity),
  delete: jest.fn(() => adminEntity),
}));

describe('AdminController', () => {
  let adminService: AdminService;
  let adminController: AdminController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        AdminService,
        Common,
        {
          provide: getRepositoryToken(AdminEntity),
          useValue: registeredApplicationRepositoryMockFactory,
        },
        LoggingUtils,
      ],
    }).compile();

    adminController = module.get<AdminController>(AdminController);
    adminService = module.get<AdminService>(AdminService);
  });

  it('adminController  should be defined', () => {
    expect(adminController).toBeDefined();
  });

  it('adminService  should be defined', () => {
    expect(adminService).toBeDefined();
  });

  it('adminController login should be success', async () => {
    const mockSuccessResponse = new AdminResponse(
      HttpStatus.OK,
      STRING.SUCCESS,
      `${STRING.SUCCESSFULLY} ${STRING.ADD_NEW_RECORD}`,
      mockLoginResponse,
    );
    jest
      .spyOn(adminService, 'adminLogin')
      .mockResolvedValueOnce(mockLoginResponse);

    const res = await adminController.adminLogin(adminDTO);

    expect(res).toBeDefined();
    expect(res).toEqual(mockSuccessResponse);
  });
});
