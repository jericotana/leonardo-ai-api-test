import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/providers/prisma/prisma.service';
import { Tasks, Prisma } from '@prisma/client';

type TasksWithSchedule = Prisma.TasksGetPayload<{
  include: {schedule: true}
}>

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  getTasks(where?: Prisma.TasksWhereInput): Promise<TasksWithSchedule[]> {
    return this.prisma.tasks.findMany({
      where,
      include: {
        schedule: true
      }
    })
  }

  getTask(where: Prisma.TasksWhereUniqueInput): Promise<TasksWithSchedule | null> {
    return this.prisma.tasks.findUnique({
      where,
      include: {
        schedule: true
      }
    })
  }

  createTask(data: Prisma.TasksUncheckedCreateInput): Promise<TasksWithSchedule> {
    return this.prisma.tasks.create({
      data: {
        account_id: data.account_id,
        type: data.type,
        start_time: data.start_time,
        duration: data.duration,
        schedule: {
          connect: {
            id: data.schedule_id
          }
        }
      },
      include: {
        schedule: true
      }
    })
  }

  updateTask(
    id: string,
    data: Prisma.TasksUpdateInput
  ): Promise<TasksWithSchedule> {
    return this.prisma.tasks.update({
      where: {
        id
      },
      data: {
        ...data,
        updated_at: new Date(),
      },
      include: {
        schedule: true
      }
    })
  }

  async deleteTask(id: string): Promise<void> {
    await this.prisma.tasks.delete({ 
      where: {
        id
      }
    }) 
  }
}
