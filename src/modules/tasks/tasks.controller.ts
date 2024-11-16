import { 
  Get, 
  Put,
  Delete,
  Body,
  Param,
  Query,
  Controller,
  ParseUUIDPipe,
  NotFoundException
} from '@nestjs/common';
import { ZodValidationPipe } from '@/common/pipes/zod.pipe';
import { TasksService } from './tasks.service';
import {
  ALLOWED_TASKS_FIELDS_FOR_SORT,
  Task,
  TaskQuery,
  tasksQuerySchema,
  updateTaskSchema,
  UpdateTaskDto,
} from './tasks.schema';
import { SortQuery } from '@/common/decorators/sort.decorator';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query(new ZodValidationPipe(tasksQuerySchema)) query?: TaskQuery,
    @SortQuery(ALLOWED_TASKS_FIELDS_FOR_SORT) sort?: Record<string, string>
  ): Promise<Task[]> {
    return this.tasksService.getTasks({
      skip: query?.skip,
      take: query?.take,
      cursor: query?.cursor ? { id: query.cursor} : undefined,
      where: {
        account_id: query?.account_id,
        schedule_id: query?.schedule_id,
        type: query?.type
      },
      orderBy: {
        ...sort
      }
    })
  }

  @Get(':taskId')
  async getTask(@Param('taskId', ParseUUIDPipe) taskId: string,): Promise<Task | null> {
    const task = await this.tasksService.getTask({id: taskId})
    if (!task) {
      throw new NotFoundException('Task Not Found')
    }

    return task
  }

  @Put(':taskId')
  async updateTask(
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Body(new ZodValidationPipe(updateTaskSchema)) task: UpdateTaskDto
  ): Promise<Task> {
    return await this.tasksService.updateTask(taskId, task)
  }

  @Delete(':taskId')
  async deleteTask(@Param('taskId', ParseUUIDPipe) taskId: string): Promise<void> {
    await this.tasksService.deleteTask(taskId)
  }
}
