
import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';
import { SchedulesService } from './schedules.service';

@Injectable()
export class SchedulesValidationPipe implements PipeTransform {
  constructor(private readonly schedulesService: SchedulesService) {}

  async transform(scheduleId: string) {
    const schedule = await this.schedulesService.getSchedule({id: scheduleId})
    if (!schedule) {
      throw new NotFoundException('Schedule does not exists')
    }
    return scheduleId;
  }
}
