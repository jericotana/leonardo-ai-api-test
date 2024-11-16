
import { Test } from '@nestjs/testing';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';
import { TasksService } from '@/modules/tasks/tasks.service';
import { PrismaClient } from '@prisma/client'
import { PrismaService } from '@/common/providers/prisma/prisma.service';
import { Schedule } from './schedules.schema';
import { Task } from '@/modules/tasks/tasks.schema';
import { mockDeep } from 'jest-mock-extended'
import { NotFoundException } from '@nestjs/common';


describe('SchedulesController', () => {
  let schedulesController: SchedulesController;
  let schedulesService: SchedulesService;
  let tasksService: TasksService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [SchedulesController],
      providers: [SchedulesService, TasksService, PrismaService],
    })
    .overrideProvider(PrismaService)
    .useValue(mockDeep<PrismaClient>())
    .compile();

    schedulesController = module.get(SchedulesController)
    tasksService = module.get(TasksService)
    schedulesService = module.get(SchedulesService)
  });

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('getSchedules', () => {
    it('should return an array of schedules', async () => {
      const expected: Schedule[] = [{
        id: 'test-id',
        account_id: 1,
        agent_id: 1,
        start_time: new Date(),
        end_time: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      }]
      jest.spyOn(schedulesService, 'getSchedules').mockResolvedValueOnce(expected);

      const result = await schedulesController.getSchedules()

      expect(expected).toBe(result);
      expect(schedulesService.getSchedules).toHaveBeenCalled()
    })
  })

  describe('getSchedule', () => {
    it('should return schedule', async () => {
      const scheduleId = 'test-id'
      const expected: Schedule = {
        id: scheduleId,
        account_id: 1,
        agent_id: 1,
        start_time: new Date(),
        end_time: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      }
      jest.spyOn(schedulesService, 'getSchedule').mockResolvedValueOnce(expected);

      const result = await schedulesController.getSchedule(scheduleId)

      expect(expected).toBe(result);
      expect(schedulesService.getSchedule).toHaveBeenCalled()
    })

    it('should throw an error if schedule does not exists', async () => {
      const scheduleId = 'invalid-id'
      jest.spyOn(schedulesService, 'getSchedule').mockResolvedValueOnce(null);

      await expect(schedulesController.getSchedule(scheduleId)).rejects.toThrow(NotFoundException)
    })
  })


  describe('createSchedule', () => {
    it('should create and return schedule', async () => {
      const expected: Schedule = {
        id: 'test-id',
        account_id: 1,
        agent_id: 1,
        start_time: new Date(),
        end_time: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      }
      jest.spyOn(schedulesService, 'createSchedule').mockResolvedValueOnce(expected);

      const result = await schedulesController.createSchedule({
        account_id: 1,
        agent_id: 1,
        start_time: new Date().toISOString(),
        end_time: new Date().toISOString()
      })

      expect(expected).toBe(result);
      expect(schedulesService.createSchedule).toHaveBeenCalled()
    })
  })

  describe('updateSchedule', () => {
    it('should update and return updated schedule', async () => {
      const scheduleId = 'test-id'
      const expected: Schedule = {
        id: scheduleId,
        account_id: 1,
        agent_id: 1,
        start_time: new Date(),
        end_time: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      }
      jest.spyOn(schedulesService, 'updateSchedule').mockResolvedValueOnce(expected);

      const result = await schedulesController.updateSchedule(
        'test-id',
        {
          account_id: 1,
          agent_id: 1,
          start_time: new Date().toISOString(),
          end_time: new Date().toISOString()
        }
      )

      expect(expected).toBe(result)
      expect(schedulesService.updateSchedule).toHaveBeenCalled()
    })
  })

  describe('deleteSchedule', () => {
    it('should delete schedule', async () => {
      const scheduleId = 'test-id'
      jest.spyOn(schedulesService, 'deleteSchedule');

      await schedulesController.deleteSchedule(scheduleId)

      expect(schedulesService.deleteSchedule).toHaveBeenCalled()
    })
  })

  describe('createTasks', () => {
    it('should create and return tasks with schedule', async () => {
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
      const expected: Task = {
        id: 'test-task-id',
        account_id: 1,
        schedule_id: scheduleId,
        start_time: new Date(),
        duration: 100,
        type: 'BREAK',
        schedule,
        created_at: new Date(),
        updated_at: new Date()
      }
      jest.spyOn(tasksService, 'createTask').mockResolvedValueOnce(expected);

      const result = await tasksService.createTask({
        account_id: 1,
        schedule_id: scheduleId,
        start_time: new Date().toISOString(),
        duration: 100,
        type: 'BREAK',
      })

      expect(expected).toBe(result);
      expect(tasksService.createTask).toHaveBeenCalled()
    })
  })
})
