-- CreateEnum
CREATE TYPE "TasksType" AS ENUM ('BREAK', 'WORK');

-- CreateTable
CREATE TABLE "Schedule" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "account_id" INTEGER NOT NULL,
    "agent_id" INTEGER NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tasks" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "account_id" INTEGER NOT NULL,
    "schedule_id" UUID NOT NULL,
    "duration" INTEGER NOT NULL,
    "type" "TasksType" NOT NULL,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Schedule_account_id_idx" ON "Schedule"("account_id");

-- CreateIndex
CREATE INDEX "Schedule_agent_id_idx" ON "Schedule"("agent_id");

-- CreateIndex
CREATE INDEX "Tasks_account_id_idx" ON "Tasks"("account_id");

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
