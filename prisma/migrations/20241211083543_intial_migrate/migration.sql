-- CreateTable
CREATE TABLE "Url" (
    "id" SERIAL NOT NULL,
    "hashed" VARCHAR(50) NOT NULL,
    "url" VARCHAR(150) NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Url_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Url_hashed_key" ON "Url"("hashed");
