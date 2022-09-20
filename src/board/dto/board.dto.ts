import { IsEmpty, IsString } from 'class-validator';

export class BoardDto {
  @IsString()
  @IsEmpty()
  title!: string;

  @IsString()
  @IsEmpty()
  content!: string;

  @IsString()
  @IsEmpty()
  photo!: string;

  @IsString()
  @IsEmpty()
  hashtag!: string;
}
