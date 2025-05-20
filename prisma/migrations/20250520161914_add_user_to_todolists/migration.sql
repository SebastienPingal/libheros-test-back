/*
  Warnings:

  - Added the required column `userId` to the `todoList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "todoList" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "todoList" ADD CONSTRAINT "todoList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
