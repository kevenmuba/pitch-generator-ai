import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GeneratePitchDto } from './dto/generate-pitch.dto';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { Template } from '@prisma/client';
@Injectable()
export class PitchesService {
  private model = openai('gpt-4o-mini');

  constructor(private prisma: PrismaService) {}

  private getCreditCost(skillLevel: string): number {
    switch (skillLevel) {
      case 'basic':
        return 1;
      case 'intermediate':
        return 2;
      case 'advanced':
        return 3;
      default:
        return 1;
    }
  }

async generatePitch(userId: string, dto: GeneratePitchDto) {
  // 1️⃣ Fetch user from DB
  const user = await this.prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new ForbiddenException('User not found');
  }

  // 2️⃣ Calculate credit cost
  const cost = this.getCreditCost(dto.skillLevel);

  const userCredits = user.credits ?? 0;
  const userTrialCredits = user.trialCredits ?? 0;
  const availableCredits = userCredits + userTrialCredits;

  // 3️⃣ Credit check
  if (!user.isUnlimited && availableCredits < cost) {
    throw new ForbiddenException('Please purchase credits to continue');
  }

  // 4️⃣ Fetch template (optional)
  let template: Template | null = null;
  if (dto.templateId) {
    template = await this.prisma.template.findUnique({
      where: { id: dto.templateId },
    });

    if (!template) {
      throw new ForbiddenException('Template not found');
    }
  }

  // 5️⃣ Build AI prompt
  const prompt = `
Scenario: ${dto.scenario}
Skill Level: ${dto.skillLevel}
Phase: ${dto.phase}

Instructions:
${template?.promptText ?? 'Generate a helpful pitch.'}

Tone: ${dto.tone ?? 'confident'}
Length: ${dto.length ?? 'medium'}

Generate a realistic pitch.
`;

  // 6️⃣ Generate pitch via AI
  const { text } = await generateText({
    model: this.model,
    prompt,
  });

  // 7️⃣ Deduct credits safely
  if (!user.isUnlimited) {
    const deductFromCredits = Math.min(userCredits, cost);
    const remainingCost = cost - deductFromCredits;
    const deductFromTrial = Math.min(userTrialCredits, remainingCost);

    const updateData: Record<string, any> = {};

    if (deductFromCredits > 0) updateData.credits = { decrement: deductFromCredits };
    if (deductFromTrial > 0) updateData.trialCredits = { decrement: deductFromTrial };

    await this.prisma.user.update({
      where: { id: user.id },
      data: updateData,
    });
  }

  // 8️⃣ Save pitch
  return await this.prisma.pitch.create({
    data: {
      userId: user.id,
      templateId: template?.id ?? null,
      scenario: dto.scenario,
      skillLevel: dto.skillLevel,
      phase: dto.phase,
      promptUsed: prompt,
      resultText: text,
      costCredits: cost,
    },
  });
}







  getUserPitches(userId: string) {
    return this.prisma.pitch.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  getPitchById(userId: string, pitchId: string) {
    return this.prisma.pitch.findFirst({
      where: {
        id: pitchId,
        userId,
      },
    });
  }
}
