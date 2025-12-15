import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserLessonDto } from './dto/create-user-lesson.dto';
import { UpdateUserLessonDto } from './dto/update-user-lesson.dto';

@Injectable()
export class UserLessonsService {
  constructor(private prisma: PrismaService) {}

  // Create a new lesson for a user
  async create(userId: string, dto: CreateUserLessonDto) {
    // Check if user already has this lesson (unique constraint)
    const existing = await this.prisma.userLesson.findFirst({
      where: { userId, scenario: dto.scenario, skillLevel: dto.skillLevel },
    });
    if (existing) return existing;

    return this.prisma.userLesson.create({
      data: {
        userId,
        scenario: dto.scenario,
        skillLevel: dto.skillLevel,
      },
    });
  }

  // Get all lessons for a user
  async findAll(userId: string) {
    return this.prisma.userLesson.findMany({
      where: { userId },
      orderBy: { startedAt: 'desc' },
    });
  }

  // Update lesson (phase or status)
  async update(id: string, dto: UpdateUserLessonDto) {
    const lesson = await this.prisma.userLesson.findUnique({ where: { id } });
    if (!lesson) throw new NotFoundException('Lesson not found');

    return this.prisma.userLesson.update({
      where: { id },
      data: dto,
    });
  }

  // Delete lesson
  async remove(id: string) {
    const lesson = await this.prisma.userLesson.findUnique({ where: { id } });
    if (!lesson) throw new NotFoundException('Lesson not found');

    return this.prisma.userLesson.delete({ where: { id } });
  }
}
