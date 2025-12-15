import { IsOptional, IsInt, IsString } from 'class-validator';

export class UpdateUserLessonDto {
  @IsInt()
  @IsOptional()
  currentPhase?: number;

  @IsString()
  @IsOptional()
  status?: string; // active | completed
}
