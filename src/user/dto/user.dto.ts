import { IsEmpty, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  @IsEmpty()
  id!: string;

  @IsString()
  @IsEmpty()
  email!: string;

  @IsString()
  @IsEmpty()
  password!: string;

  @IsString()
  @IsEmpty()
  profilePhoto!: string;

  @IsString()
  @IsEmpty()
  introduction!: string;

  @IsString()
  @IsEmpty()
  interest!: string;
}
