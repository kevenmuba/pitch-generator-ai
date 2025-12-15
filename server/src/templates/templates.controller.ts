import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  // Public GET
  @Get()
  getTemplates(
    @Query('scenario') scenario?: string,
    @Query('skillLevel') skillLevel?: string,
  ) {
    return this.templatesService.findAll(scenario, skillLevel);
  }

  // Admin POST
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  createTemplate(@Body() dto: CreateTemplateDto, @Req() req) {
    return this.templatesService.create(req.user.id, dto);
  }

  // Admin PATCH
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  updateTemplate(
    @Param('id') id: string,
    @Body() dto: UpdateTemplateDto,
    @Req() req,
  ) {
    return this.templatesService.update(id, req.user.id, dto);
  }

  // Admin DELETE
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  deleteTemplate(@Param('id') id: string, @Req() req) {
    return this.templatesService.remove(id, req.user.id);
  }
}
