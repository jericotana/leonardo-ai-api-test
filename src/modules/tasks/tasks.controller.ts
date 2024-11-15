import { 
  Get, 
  Put,
  Delete,
  Body,
  Param,
  Controller,
  ParseUUIDPipe,
  NotFoundException
} from '@nestjs/common';
import { ZodValidationPipe } from '@/common/pipes/zod.pipe';
import { TasksService } from './tasks.service';
import { 
  Task,
  updateTaskSchema,
  UpdateTaskDto,
} from './tasks.schema';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(): Promise<Task[]> {
    return this.tasksService.getTasks();
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
