import { 
  Get, 
  Controller,
  Param,
  ParseIntPipe
} from '@nestjs/common';
import { SchedulesService } from '@/modules/schedules/schedules.service';
import { TasksService } from '@/modules/tasks/tasks.service';
import { Schedule } from '@/modules/schedules/schedules.schema';
import { Task } from '@/modules/tasks/tasks.schema';


@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly schedulesService: SchedulesService,
    private readonly tasksService: TasksService,
  ) {}

  @Get(':accountId/schedules')
  getAcccountSchedules(@Param('accountId', ParseIntPipe) accountId: number): Promise<Schedule[]> {
    return this.schedulesService.getSchedules({
      where: {
        account_id: accountId
      }
    });
  }

  @Get(':accountId/tasks')
  getAccountTasks(@Param('accountId', ParseIntPipe) accountId: number): Promise<Task[]> {
    return this.tasksService.getTasks({
      account_id: accountId
    });
  }
}
