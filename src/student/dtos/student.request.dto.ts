import { IsNotEmpty } from 'class-validator';

export class StudentDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
