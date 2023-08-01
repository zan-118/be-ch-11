/*
  Warnings:

  - A unique constraint covering the columns `[Name]` on the table `game` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "gameResult" AS ENUM ('WIN', 'LOSE', 'DRAW');

-- CreateTable
CREATE TABLE "historyGame" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "recent_game" "gameResult" NOT NULL,
    "recent_score" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT,

    CONSTRAINT "historyGame_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "game_Name_key" ON "game"("Name");

-- AddForeignKey
ALTER TABLE "historyGame" ADD CONSTRAINT "historyGame_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
