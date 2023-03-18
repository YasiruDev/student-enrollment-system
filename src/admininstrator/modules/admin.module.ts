import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from '../services/admin.service';
import { AdminController } from '../controllers/admin.controller';
import { Common } from '../../config/common/common';
import { LoggingUtils } from '../../logger/loggingUtils';
import { AdminEntity } from '../entities/admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity])],
  providers: [AdminService, Common, LoggingUtils],
  controllers: [AdminController],
})
export class AdminModule {}
