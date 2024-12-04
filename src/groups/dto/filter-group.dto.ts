import { IsOptional, IsString, IsNumber } from 'class-validator';

export class FilterLessonsDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  level?: string;

  @IsOptional()
  @IsString()
  branch?: string;

  @IsOptional()
  @IsString()
  daysOfLessons?: string;

  @IsOptional()
  @IsString()
  status?: string;
}
