

import { Test } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client'
import { TasksValidationPipe } from './tasks.pipe';
import { TasksService } from './tasks.service';
import { PrismaService } from '@/common/providers/prisma/prisma.service';
import { mockDeep } from 'jest-mock-extended'
import { Task } from './tasks.schema';
import { Schedule } from '@/modules/schedules/schedules.schema';
import { NotFoundException } from '@nestjs/common';

describe('TasksValidationPipe', () => {
  let tasksPipe: TasksValidationPipe;
  let tasksService: TasksService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [TasksService, PrismaService],
    })
    .overrideProvider(PrismaService)
    .useValue(mockDeep<PrismaClient>())
    .compile();
  
    tasksService = module.get(TasksService)
    tasksPipe = new TasksValidationPipe(tasksService)
  });

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('transform', () => {
    it('should return taskId when task exists', async () => {
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
      const taskId = 'test-task-id'
      const task: Task = {
        id: taskId,
        account_id: 1,
        type: 'BREAK',
        duration: 10,
        schedule_id: scheduleId,
        schedule,
        start_time: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      }
      jest.spyOn(tasksService, 'getTask').mockResolvedValueOnce(task);

      const result = await tasksPipe.transform(taskId)

      expect(result).toBe(taskId);
    });

    it('should throw a NotFoundException when schedule does not exists', async () => {
      const taskId = 'invalid-id'
      jest.spyOn(tasksService, 'getTask').mockResolvedValueOnce(null);

      await expect(tasksPipe.transform(taskId)).rejects.toThrow(NotFoundException)
    });
  });
});
