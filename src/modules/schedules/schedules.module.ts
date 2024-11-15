import { Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { PrismaService } from '@/common/providers/prisma/prisma.service';
import { TasksService } from '@/modules/tasks/tasks.service';

@Module({
  imports: [SchedulesModule],
  controllers: [SchedulesController],
  providers: [SchedulesService, TasksService, PrismaService],
})
export class SchedulesModule {}