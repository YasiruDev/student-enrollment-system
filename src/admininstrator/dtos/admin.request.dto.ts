import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, Matches } from 'class-validator';

export class AdminDTO {
  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
