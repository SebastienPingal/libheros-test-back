/*
  Warnings:

  - Added the required column `expirationDate` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "expirationDate" TIMESTAMP(3) NOT NULL;
