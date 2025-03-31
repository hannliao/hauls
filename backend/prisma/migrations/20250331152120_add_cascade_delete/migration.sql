/*
  Warnings:

  - A unique constraint covering the columns `[username,slug]` on the table `Haul` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_haulId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Haul_username_slug_key" ON "Haul"("username", "slug");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_haulId_fkey" FOREIGN KEY ("haulId") REFERENCES "Haul"("id") ON DELETE CASCADE ON UPDATE CASCADE;
