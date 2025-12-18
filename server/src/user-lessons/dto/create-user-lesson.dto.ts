import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum SkillLevel {
  BASIC = 'basic',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

export class CreateUserLessonDto {
  @IsString()
  @IsNotEmpty()
  scenario: string;

  @IsEnum(SkillLevel)
  skillLevel: SkillLevel;
}
