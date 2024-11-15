import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaService } from '@/common/providers/prisma/prisma.service';

@Module({
  imports: [TasksModule],
  controllers: [TasksController],
  providers: [TasksService, PrismaService],
})
export class TasksModule {}