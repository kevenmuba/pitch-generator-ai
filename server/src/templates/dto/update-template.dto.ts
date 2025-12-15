import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateTemplateDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  scenario?: string;

  @IsString()
  @IsOptional()
  skillLevel?: string;

  @IsString()
  @IsOptional()
  promptText?: string;

  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;
}
