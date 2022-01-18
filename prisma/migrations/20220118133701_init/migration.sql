-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "infoId" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "infos" (
    "id" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "currentHashedRefreshToken" TEXT,

    CONSTRAINT "infos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_infoId_key" ON "users"("infoId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_infoId_fkey" FOREIGN KEY ("infoId") REFERENCES "infos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
