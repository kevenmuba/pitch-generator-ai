/*
  Warnings:

  - You are about to drop the column `current_phase` on the `UserLesson` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserLesson" DROP COLUMN "current_phase",
ADD COLUMN     "current_chapter" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "total_chapters" INTEGER NOT NULL DEFAULT 2,
ALTER COLUMN "status" SET DEFAULT 'in_progress';
