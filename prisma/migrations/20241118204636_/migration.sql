/*
  Warnings:

  - You are about to drop the column `libraryId` on the `Books` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Books" DROP CONSTRAINT "Books_libraryId_fkey";

-- AlterTable
ALTER TABLE "Books" DROP COLUMN "libraryId";

-- CreateTable
CREATE TABLE "_BooksToLibrary" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BooksToLibrary_AB_unique" ON "_BooksToLibrary"("A", "B");

-- CreateIndex
CREATE INDEX "_BooksToLibrary_B_index" ON "_BooksToLibrary"("B");

-- AddForeignKey
ALTER TABLE "_BooksToLibrary" ADD CONSTRAINT "_BooksToLibrary_A_fkey" FOREIGN KEY ("A") REFERENCES "Books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BooksToLibrary" ADD CONSTRAINT "_BooksToLibrary_B_fkey" FOREIGN KEY ("B") REFERENCES "Library"("id") ON DELETE CASCADE ON UPDATE CASCADE;
