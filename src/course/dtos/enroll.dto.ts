import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, Matches } from 'class-validator';

export class EnrollDTO {
  @IsNotEmpty()
  courseId: number;
  @IsNotEmpty()
  studentId: number;
}
