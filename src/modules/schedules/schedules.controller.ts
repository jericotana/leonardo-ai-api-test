import { 
  Get, 
  Post,  
  Put,
  Delete,
  Body,
  Param,
  Controller,
  ParseUUIDPipe,
  NotFoundException
} from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { TasksService } from '@/modules/tasks/tasks.service';
import { ZodValidationPipe } from '@/common/pipes/zod.pipe';
import {
  Schedule,
  createScheduleSchema,
  CreateScheduleDto,
  updateScheduleSchema,
  UpdateScheduleDto,
  createTaskScheduleSchema,
  CreateTaskScheduleDto 
} from './schedules.schema';
import { Task } from '../tasks/tasks.schema';
import { SchedulesValidationPipe } from './schedules.pipe';

@Controller('schedules')
export class SchedulesController {
  constructor(
    private readonly schedulesService: SchedulesService,
    private readonly tasksService: TasksService,
  ) {}

  @Get()
  getSchedules(): Promise<Schedule[]> {
    return this.schedulesService.getSchedules();
  }

  @Get(':scheduleId')
  async getSchedule(@Param('scheduleId', ParseUUIDPipe) scheduleId: string): Promise<Schedule> {
    const schedule = await this.schedulesService.getSchedule({
      id: scheduleId
    })

    if (!schedule) {
      throw new NotFoundException('Schedule Not Found')
    }

    return schedule
  }

  @Post()
  async createSchedule(
    @Body(new ZodValidationPipe(createScheduleSchema)) schedule: CreateScheduleDto
  ): Promise<Schedule> {
    return await this.schedulesService.createSchedule(schedule)
  }

  @Put(':scheduleId')
  async updateSchedule(
    @Param('scheduleId', ParseUUIDPipe, SchedulesValidationPipe) scheduleId: string,
    @Body(new ZodValidationPipe(updateScheduleSchema)) schedule: UpdateScheduleDto
  ): Promise<Schedule> {
    return await this.schedulesService.updateSchedule(scheduleId, schedule)
  }

  @Delete(':scheduleId')
  async deleteSchedule(@Param('scheduleId', ParseUUIDPipe, SchedulesValidationPipe) scheduleId: string): Promise<void> {
    await this.schedulesService.deleteSchedule(scheduleId)
  }

  @Post(':scheduleId/tasks')
  async createTasks(
    @Param('scheduleId', ParseUUIDPipe, SchedulesValidationPipe) scheduleId: string,
    @Body(new ZodValidationPipe(createTaskScheduleSchema)) createTaskScheduleDto: CreateTaskScheduleDto
  ): Promise<Task> {
    return await this.tasksService.createTask({
      schedule_id: scheduleId,
      ...createTaskScheduleDto
    })
  }

  @Get(':scheduleId/tasks')
  async getTasksByScheduleId(
    @Param('scheduleId', ParseUUIDPipe, SchedulesValidationPipe) scheduleId: string
  ): Promise<Task[]> {
    return await this.tasksService.getTasks({
      schedule_id: scheduleId
    })
  }
}
