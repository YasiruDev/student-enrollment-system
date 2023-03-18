import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admininstrator/modules/admin.module';
import { StudentModule } from './student/modules/student.module';
import { CourseModule } from './course/modules/course.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_POSTGRES_HOST,
        port: parseInt(process.env.DB_POSTGRES_PORT) || 3306,
        username: process.env.DB_POSTGRES_USER,
        password: process.env.DB_POSTGRES_PASSWORD,
        database: process.env.DB_POSTGRES_DATABASE,
        entities: [process.env.DB_POSTGRES_ENTITIES],
        synchronize: false,
      }),
    }),
    AdminModule,
    StudentModule,
    CourseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
