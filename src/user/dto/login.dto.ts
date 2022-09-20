import { IsEmpty, IsString } from 'class-validator';

export class loginDto {
  @IsString()
  @IsEmpty()
  id: string;

  @IsString()
  @IsEmpty()
  password: string;
}
