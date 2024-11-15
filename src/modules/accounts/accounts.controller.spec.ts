
import { Test } from '@nestjs/testing';
import { AccountsController } from './accounts.controller';
import { SchedulesService } from '@/modules/schedules/schedules.service';
import { TasksService } from '@/modules/tasks/tasks.service';
import { PrismaClient } from '@prisma/client'
import { PrismaService } from '@/common/providers/prisma/prisma.service';
import { Schedule } from '@/modules/schedules/schedules.schema';
import { Task } from '@/modules/tasks/tasks.schema';
import { mockDeep } from 'jest-mock-extended'

describe('AccountsController', () => {
  let accountsController: AccountsController;
  let schedulesService: SchedulesService;
  let tasksService: TasksService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AccountsController],
      providers: [SchedulesService, TasksService, PrismaService],
    })
    .overrideProvider(PrismaService)
    .useValue(mockDeep<PrismaClient>())
    .compile();

    accountsController = module.get(AccountsController)
    tasksService = module.get(TasksService)
    schedulesService = module.get(SchedulesService)
  });

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('getAcccountSchedules', () => {
    it('should return an array of schedules', async () => {
      const accountId = 1
      const expected: Schedule[] = [{
        id: 'test-id',
        account_id: accountId,
        agent_id: 1,
        start_time: new Date(),
        end_time: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      }]
      jest.spyOn(schedulesService, 'getSchedules').mockResolvedValueOnce(expected);

      const result = await accountsController.getAcccountSchedules(accountId)

      expect(expected).toBe(result);
      expect(schedulesService.getSchedules).toHaveBeenCalled()
    })
  })

  describe('getAccountTasks', () => {
    it('should return an array of tasks', async () => {
      const scheduleId = 'test-schedule-id'
      const schedule: Schedule = {
        id: scheduleId,
        account_id: 1,
        agent_id: 1,
        start_time: new Date(),
        end_time: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      }
      const accountId = 1
      const expected: Task[] = [{
        id: 'test-task-id',
        account_id: 1,
        schedule_id: scheduleId,
        start_time: new Date(),
        duration: 100,
        type: 'BREAK',
        schedule,
        created_at: new Date(),
        updated_at: new Date()
      }]
      jest.spyOn(tasksService, 'getTasks').mockResolvedValueOnce(expected);

      const result = await accountsController.getAccountTasks(accountId)

      expect(expected).toBe(result);
      expect(tasksService.getTasks).toHaveBeenCalled()
    })
  })
})
