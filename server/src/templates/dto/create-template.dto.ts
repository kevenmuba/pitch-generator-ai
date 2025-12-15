import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateTemplateDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  scenario: string; // e.g., dating | cold_call | business

  @IsString()
  @IsNotEmpty()
  skillLevel: string; // basic | intermediate | advanced

  @IsString()
  @IsNotEmpty()
  promptText: string;

  @IsBoolean()
  isPublic: boolean;
}
