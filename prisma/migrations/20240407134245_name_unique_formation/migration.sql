/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `formation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `formation_name_key` ON `formation`(`name`);
