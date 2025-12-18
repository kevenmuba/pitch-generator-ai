import { IsOptional, IsInt, IsEnum } from 'class-validator';

export enum LessonStatus {
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

export class UpdateUserLessonDto {
  @IsInt()
  @IsOptional()
  currentPhase?: number;  // ✅ updated

  @IsEnum(LessonStatus)
  @IsOptional()
  status?: LessonStatus;
}
