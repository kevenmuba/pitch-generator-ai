import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';

@Injectable()
export class TemplatesService {
  constructor(private readonly prisma: PrismaService) {}

  // Admin: create a template
  async create(adminId: string, dto: CreateTemplateDto) {
    return this.prisma.template.create({
      data: {
        ...dto,
        createdById: adminId, // track who created
      },
    });
  }

  // Public: get templates (filter by scenario/skillLevel)
  async findAll(scenario?: string, skillLevel?: string) {
    return this.prisma.template.findMany({
      where: {
        isPublic: true,
        ...(scenario && { scenario }),
        ...(skillLevel && { skillLevel }),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Admin: update template
  async update(id: string, adminId: string, dto: UpdateTemplateDto) {
    const template = await this.prisma.template.findUnique({ where: { id } });

    if (!template || template.createdById !== adminId) {
      throw new ForbiddenException('Not allowed to modify this template');
    }

    return this.prisma.template.update({
      where: { id },
      data: dto,
    });
  }

  // Admin: delete template
  async remove(id: string, adminId: string) {
    const template = await this.prisma.template.findUnique({ where: { id } });

    if (!template || template.createdById !== adminId) {
      throw new ForbiddenException('Not allowed to delete this template');
    }

    return this.prisma.template.delete({
      where: { id },
    });
  }
}
