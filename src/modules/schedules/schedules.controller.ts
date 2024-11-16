import { 
  Get, 
  Post,  
  Put,
  Delete,
  Body,
  Param,
  Query,
  Controller,
  ParseUUIDPipe,
  NotFoundException
} from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { TasksService } from '@/modules/tasks/tasks.service';
import { ZodValidationPipe } from '@/common/pipes/zod.pipe';
import {
  ALLOWED_SCHEDULES_FIELDS_FOR_SORT,
  Schedule,
  scheduleQuerySchema,
  ScheduleQuery,
  createScheduleSchema,
  CreateScheduleDto,
  updateScheduleSchema,
  UpdateScheduleDto,
  createTaskScheduleSchema,
  CreateTaskScheduleDto 
} from './schedules.schema';
import { Task } from '../tasks/tasks.schema';
import { SchedulesValidationPipe } from './schedules.pipe';
import { SortQuery } from '@/common/decorators/sort.decorator';

@Controller('schedules')
export class SchedulesController {
  constructor(
    private readonly schedulesService: SchedulesService,
    private readonly tasksService: TasksService,
  ) {}

  @Get()
  getSchedules(
    @Query(new ZodValidationPipe(scheduleQuerySchema)) query?: ScheduleQuery,
    @SortQuery(ALLOWED_SCHEDULES_FIELDS_FOR_SORT) sort?: Record<string, string>
  ): Promise<Schedule[]> {
    return this.schedulesService.getSchedules({
      skip: query?.skip,
      take: query?.take,
      cursor: query?.cursor ? { id: query.cursor} : undefined,
      where: {
        account_id: query?.account_id,
        agent_id: query?.agent_id
      },
      orderBy: {
        ...sort
      }
    })
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
}
