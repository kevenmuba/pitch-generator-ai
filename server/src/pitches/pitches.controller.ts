import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PitchesService } from './pitches.service';
import { GeneratePitchDto } from './dto/generate-pitch.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('pitches')
@UseGuards(JwtAuthGuard)
export class PitchesController {
  constructor(private readonly pitchesService: PitchesService) {}

  @Post('generate')
generate(@Req() req, @Body() dto: GeneratePitchDto) {
  return this.pitchesService.generatePitch(req.user.id, dto);
}


  @Get()
  findAll(@Req() req) {

    return this.pitchesService.getUserPitches(req.user.id);
  }

  @Get(':id')
  findOne(@Req() req, @Param('id') id: string) {
    return this.pitchesService.getPitchById(req.user.id, id);
  }



}
