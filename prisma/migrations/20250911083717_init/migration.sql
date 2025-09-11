/*
  Warnings:

  - You are about to drop the column `email` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `end` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Booking" DROP COLUMN "email",
ADD COLUMN     "end" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "note" TEXT;
