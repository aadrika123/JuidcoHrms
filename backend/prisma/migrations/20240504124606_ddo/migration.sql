/*
  Warnings:

  - You are about to drop the column `DDOCODE` on the `ddo` table. All the data in the column will be lost.
  - You are about to drop the column `DDONAME` on the `ddo` table. All the data in the column will be lost.
  - You are about to drop the column `DESIGNATION` on the `ddo` table. All the data in the column will be lost.
  - You are about to drop the column `OFFICE` on the `ddo` table. All the data in the column will be lost.
  - You are about to drop the column `TreasuryName` on the `ddo` table. All the data in the column will be lost.
  - Added the required column `ddo_code` to the `ddo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ddo_name` to the `ddo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `designation` to the `ddo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `office` to the `ddo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `treasury_name` to the `ddo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ddo" DROP COLUMN "DDOCODE",
DROP COLUMN "DDONAME",
DROP COLUMN "DESIGNATION",
DROP COLUMN "OFFICE",
DROP COLUMN "TreasuryName",
ADD COLUMN     "ddo_code" TEXT NOT NULL,
ADD COLUMN     "ddo_name" TEXT NOT NULL,
ADD COLUMN     "designation" TEXT NOT NULL,
ADD COLUMN     "office" TEXT NOT NULL,
ADD COLUMN     "treasury_name" TEXT NOT NULL;
