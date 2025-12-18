-- CreateTable
CREATE TABLE "Pitch" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "lessonId" TEXT,
    "templateId" TEXT,
    "scenario" TEXT NOT NULL,
    "skill_level" TEXT NOT NULL,
    "phase" INTEGER NOT NULL,
    "prompt_used" TEXT NOT NULL,
    "result_text" TEXT NOT NULL,
    "cost_credits" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pitch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Pitch_userId_scenario_skill_level_phase_idx" ON "Pitch"("userId", "scenario", "skill_level", "phase");

-- AddForeignKey
ALTER TABLE "Pitch" ADD CONSTRAINT "Pitch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pitch" ADD CONSTRAINT "Pitch_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE SET NULL ON UPDATE CASCADE;
