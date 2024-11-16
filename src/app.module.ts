import { Module } from '@nestjs/common';
import { SchedulesModule } from './modules/schedules/schedules.module';
import { TasksModule } from './modules/tasks/tasks.module';

@Module({
  imports: [
    SchedulesModule, 
    TasksModule,
  ]
})
export class AppModule {}
