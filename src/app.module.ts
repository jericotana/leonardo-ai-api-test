import { Module } from '@nestjs/common';
import { SchedulesModule } from './modules/schedules/schedules.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { AccountsModule } from './modules/accounts/accounts.module';
import { AgentsModule } from './modules/agents/agents.module';

@Module({
  imports: [
    AccountsModule,
    AgentsModule, 
    SchedulesModule, 
    TasksModule,
  ]
})
export class AppModule {}
