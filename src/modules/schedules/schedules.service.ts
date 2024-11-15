import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/providers/prisma/prisma.service';
import { Schedule, Prisma } from '@prisma/client';

@Injectable()
export class SchedulesService {
  constructor(private prisma: PrismaService) {}

  getSchedules(where?: Prisma.ScheduleWhereInput): Promise<Schedule[]> {
    return this.prisma.schedule.findMany({
      where
    })
  }

  getSchedule(where: Prisma.ScheduleWhereUniqueInput): Promise<Schedule | null> {
    return this.prisma.schedule.findUnique({
      where
    })
  }

  createSchedule(data: Prisma.ScheduleCreateInput): Promise<Schedule> {
    return this.prisma.schedule.create({
      data
    })
  }

  updateSchedule(
    id: string,
    data: Prisma.ScheduleUpdateInput
  ): Promise<Schedule> {
    return this.prisma.schedule.update({
      where: {
        id
      },
      data: {
        ...data,
        updated_at: new Date(),
      }
    })
  }

  async deleteSchedule(id: string): Promise<void> {
    await this.prisma.schedule.delete({ 
      where: {
        id
      }
    }) 
  }
}
