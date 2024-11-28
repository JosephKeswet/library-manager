/*
  Warnings:

  - A unique constraint covering the columns `[bookIdentifier]` on the table `Book` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bookIdentifier` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_password_key";

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "bookIdentifier" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Book_bookIdentifier_key" ON "Book"("bookIdentifier");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
