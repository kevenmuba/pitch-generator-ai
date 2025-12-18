/*
  Warnings:

  - You are about to drop the column `current_chapter` on the `UserLesson` table. All the data in the column will be lost.
  - You are about to drop the column `total_chapters` on the `UserLesson` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserLesson" DROP COLUMN "current_chapter",
DROP COLUMN "total_chapters",
ADD COLUMN     "current_phase" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "total_phases" INTEGER NOT NULL DEFAULT 2;

-- AddForeignKey
ALTER TABLE "Pitch" ADD CONSTRAINT "Pitch_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "UserLesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;
