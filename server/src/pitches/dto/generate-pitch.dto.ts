import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class GeneratePitchDto {
  @IsString()
  scenario: string;

  @IsString()
  skillLevel: string;

  @IsInt()
  @Min(1)
  phase: number;

  @IsOptional()
  @IsString()
  templateId?: string;

  @IsOptional()
  @IsString()
  tone?: string;

  @IsOptional()
  @IsString()
  length?: 'short' | 'medium' | 'long';
}
