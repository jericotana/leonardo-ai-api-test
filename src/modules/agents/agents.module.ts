import { Module } from '@nestjs/common';
import { SchedulesService } from '@/modules/schedules/schedules.service';
import { AgentsController } from './agents.controller';
import { PrismaService } from '@/common/providers/prisma/prisma.service';

@Module({
  imports: [AgentsModule],
  controllers: [AgentsController],
  providers: [SchedulesService, AgentsController, PrismaService],
})
export class AgentsModule {}