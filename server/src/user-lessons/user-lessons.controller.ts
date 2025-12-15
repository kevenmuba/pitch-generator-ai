import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UserLessonsService } from './user-lessons.service';
import { CreateUserLessonDto } from './dto/create-user-lesson.dto';
import { UpdateUserLessonDto } from './dto/update-user-lesson.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user-lessons')
@UseGuards(JwtAuthGuard)
export class UserLessonsController {
  constructor(private readonly userLessonsService: UserLessonsService) {}

  // 1️⃣ Add a new lesson
  @Post()
  create(@Req() req, @Body() dto: CreateUserLessonDto) {
    return this.userLessonsService.create(req.user.id, dto);
  }

  // 2️⃣ Get all lessons for user
  @Get()
  findAll(@Req() req) {
    return this.userLessonsService.findAll(req.user.id);
  }

  // 3️⃣ Update lesson phase/completion
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserLessonDto) {
    return this.userLessonsService.update(id, dto);
  }

  // 4️⃣ Delete lesson (optional)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userLessonsService.remove(id);
  }
}
