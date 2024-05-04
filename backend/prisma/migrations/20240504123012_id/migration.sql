-- DropIndex
DROP INDEX "ddo_DDOCODE_key";

-- AlterTable
ALTER TABLE "ddo" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ddo_pkey" PRIMARY KEY ("id");
