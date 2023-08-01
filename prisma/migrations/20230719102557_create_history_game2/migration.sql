/*
  Warnings:

  - You are about to drop the column `status` on the `historyGame` table. All the data in the column will be lost.
  - Added the required column `result_game` to the `historyGame` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `recent_game` on the `historyGame` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "historyGame" DROP COLUMN "status",
ADD COLUMN     "result_game" "gameResult" NOT NULL,
DROP COLUMN "recent_game",
ADD COLUMN     "recent_game" TEXT NOT NULL;
