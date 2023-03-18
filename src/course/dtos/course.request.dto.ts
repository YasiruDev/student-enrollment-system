import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, Matches } from 'class-validator';

export class CourseDTO {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  maxCapacity: number;
}
