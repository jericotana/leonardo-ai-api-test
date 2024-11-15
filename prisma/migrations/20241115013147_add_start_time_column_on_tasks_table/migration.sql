/*
  Warnings:

  - Added the required column `start_time` to the `Tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tasks" ADD COLUMN     "start_time" TIMESTAMP(3) NOT NULL;
