-- CreateTable
CREATE TABLE "timer" (
    "id" SERIAL NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "timer_pkey" PRIMARY KEY ("id")
);
