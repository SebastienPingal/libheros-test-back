/*
  Warnings:

  - A unique constraint covering the columns `[title,userId]` on the table `todoList` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "todoList_title_userId_key" ON "todoList"("title", "userId");
