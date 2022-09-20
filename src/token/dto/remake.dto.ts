import { IsNotEmpty, IsString } from 'class-validator';

export default class reMakeDto {
  @IsString()
  @IsNotEmpty()
  refreshToken!: string;
}
