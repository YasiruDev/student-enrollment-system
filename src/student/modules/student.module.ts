import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentService } from '../services/student.service';
import { StudentController } from '../controllers/student.controller';
import { Common } from '../../config/common/common';
import { LoggingUtils } from '../../logger/loggingUtils';
import { StudentEntity } from '../entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity])],
  providers: [StudentService, Common, LoggingUtils],
  controllers: [StudentController],
})
export class StudentModule {}
