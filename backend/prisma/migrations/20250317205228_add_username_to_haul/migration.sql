/*
  Warnings:

  - Added the required column `username` to the `Haul` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Haul" ADD COLUMN     "username" TEXT NOT NULL;
