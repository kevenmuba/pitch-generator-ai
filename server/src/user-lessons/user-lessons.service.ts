import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserLessonDto, SkillLevel } from './dto/create-user-lesson.dto';
import { UpdateUserLessonDto } from './dto/update-user-lesson.dto';

@Injectable()
export class UserLessonsService {
  constructor(private prisma: PrismaService) {}

  // ===============================
  // Create a new lesson for a user
  // ===============================
async create(userId: string, dto: CreateUserLessonDto) {
  console.log('Creating lesson:', userId, dto);

  const existing = await this.prisma.userLesson.findUnique({
    where: {
      userId_scenario_skillLevel: {
        userId,
        scenario: dto.scenario,
        skillLevel: dto.skillLevel,
      },
    },
  });

  if (existing) {
    return existing;
  }

  // Determine total phases based on skill level
  let totalPhases = 2;

  switch (dto.skillLevel) {
    case SkillLevel.INTERMEDIATE:
      totalPhases = 4;
      break;
    case SkillLevel.ADVANCED:
      totalPhases = 6;
      break;
    case SkillLevel.BASIC:
    default:
      totalPhases = 2;
  }

  return this.prisma.userLesson.create({
    data: {
      userId,
      scenario: dto.scenario,
      skillLevel: dto.skillLevel,
      currentPhase: 1,
      totalPhases,  // ✅ now correct
      status: 'in_progress',
    },
  });
}


  // ===============================
  // Get all lessons for a user
  // ===============================
  async findAll(userId: string) {
    return this.prisma.userLesson.findMany({
      where: { userId },
      orderBy: { startedAt: 'desc' },
    });
  }

  // ===============================
  // Get one lesson
  // ===============================
  async findOne(userId: string, lessonId: string) {
    const lesson = await this.prisma.userLesson.findFirst({
      where: {
        id: lessonId,
        userId,
      },
    });

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    return lesson;
  }

  // ===============================
  // Update lesson (chapter or status)
  // ===============================
  async update(id: string, dto: UpdateUserLessonDto) {
    const lesson = await this.prisma.userLesson.findUnique({
      where: { id },
    });

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    return this.prisma.userLesson.update({
      where: { id },
      data: dto,
    });
  }

  // ===============================
  // Delete lesson
  // ===============================
  async remove(id: string) {
    const lesson = await this.prisma.userLesson.findUnique({
      where: { id },
    });

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    return this.prisma.userLesson.delete({
      where: { id },
    });
  }
}
