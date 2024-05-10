-- CreateTable
CREATE TABLE "fileUpload" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "mimeType" TEXT,
    "buffer" BYTEA,
    "size" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fileUpload_pkey" PRIMARY KEY ("id")
);
