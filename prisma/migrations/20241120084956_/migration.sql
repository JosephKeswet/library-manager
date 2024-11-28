/*
  Warnings:

  - Changed the type of `genre` on the `Books` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `genre` on the `Library` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('FICTION', 'NON_FICTION', 'FANTASY', 'SCI_FI', 'MYSTERY', 'ROMANCE', 'HORROR', 'BIOGRAPHY');

-- AlterTable
ALTER TABLE "Books" DROP COLUMN "genre",
ADD COLUMN     "genre" "Genre" NOT NULL;

-- AlterTable
ALTER TABLE "Library" DROP COLUMN "genre",
ADD COLUMN     "genre" "Genre" NOT NULL;
