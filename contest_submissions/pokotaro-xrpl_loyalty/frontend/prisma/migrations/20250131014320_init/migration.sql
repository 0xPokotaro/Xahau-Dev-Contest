-- CreateTable
CREATE TABLE "employees" (
    "id" SERIAL NOT NULL,
    "degit" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employees_degit_key" ON "employees"("degit");

-- CreateIndex
CREATE UNIQUE INDEX "employees_address_key" ON "employees"("address");
