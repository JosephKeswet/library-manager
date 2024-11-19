/*
  Warnings:

  - You are about to drop the `_BooksToLibrary` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BooksToLibrary" DROP CONSTRAINT "_BooksToLibrary_A_fkey";

-- DropForeignKey
ALTER TABLE "_BooksToLibrary" DROP CONSTRAINT "_BooksToLibrary_B_fkey";

-- AlterTable
ALTER TABLE "Books" ADD COLUMN     "libraryId" INTEGER;

-- DropTable
DROP TABLE "_BooksToLibrary";

-- AddForeignKey
ALTER TABLE "Books" ADD CONSTRAINT "Books_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "Library"("id") ON DELETE SET NULL ON UPDATE CASCADE;
