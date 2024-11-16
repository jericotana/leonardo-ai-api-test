import { 
  Get, 
  Controller,
  Param,
  ParseIntPipe
} from '@nestjs/common';
import { SchedulesService } from '@/modules/schedules/schedules.service';
import { Schedule } from '@/modules/schedules/schedules.schema';


@Controller('agents')
export class AgentsController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Get(':agentId/schedules')
  getAgentSchedules(@Param('agentId', ParseIntPipe) agentId: number): Promise<Schedule[]> {
    return this.schedulesService.getSchedules({
      where: {
        agent_id: agentId
      }
    });
  }
}
