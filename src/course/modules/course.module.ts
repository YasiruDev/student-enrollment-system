import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseService } from '../services/course.service';
import { CourseController } from '../controllers/course.controller';
import { Common } from '../../config/common/common';
import { LoggingUtils } from '../../logger/loggingUtils';
import { CourseEntity } from '../entities/course.entity';
import { EnrollmentEntity } from '../entities/enrollment.entity';
import { AuthMiddleware } from '../../core/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity, EnrollmentEntity])],
  providers: [CourseService, Common, LoggingUtils],
  controllers: [CourseController],
})
export class CourseModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: 'course/', // admin token required to create new post
      method: RequestMethod.POST,
    });
  }
}
