import { Module } from '@nestjs/common';
import { SchedulesService } from '@/modules/schedules/schedules.service';
import { AccountsController } from './accounts.controller';
import { PrismaService } from '@/common/providers/prisma/prisma.service';
import { TasksService } from '@/modules/tasks/tasks.service';

@Module({
  imports: [AccountsModule],
  controllers: [AccountsController],
  providers: [SchedulesService, TasksService, PrismaService],
})
export class AccountsModule {}