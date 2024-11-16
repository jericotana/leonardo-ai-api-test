
import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Injectable()
export class TasksValidationPipe implements PipeTransform {
  constructor(private readonly taskService: TasksService) {}

  async transform(taskId: string) {
    const task = await this.taskService.getTask({id: taskId})
    if (!task) {
      throw new NotFoundException('Task does not exists')
    }
    return taskId;
  }
}
