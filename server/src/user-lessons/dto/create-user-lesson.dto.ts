import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserLessonDto {
  @IsString()
  @IsNotEmpty()
  scenario: string; // dating | cold_call | business

  @IsString()
  @IsNotEmpty()
  skillLevel: string; // basic | intermediate | advanced
}
