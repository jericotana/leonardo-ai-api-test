
import { Test } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { PrismaClient } from '@prisma/client'
import { PrismaService } from '@/common/providers/prisma/prisma.service';
import { Task } from './tasks.schema';
import { Schedule } from '@/modules/schedules/schedules.schema';
import { mockDeep } from 'jest-mock-extended'
import { NotFoundException } from '@nestjs/common';


describe('TasksController', () => {
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
  let tasksController: TasksController;
  let tasksService: TasksService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService, PrismaService],
    })
    .overrideProvider(PrismaService)
    .useValue(mockDeep<PrismaClient>())
    .compile();

    tasksController = module.get(TasksController)
    tasksService = module.get(TasksService)
  });

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('getTasks', () => {
    it('should return an array of tasks', async () => {
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

      const result = await tasksController.getTasks()

      expect(expected).toBe(result);
      expect(tasksService.getTasks).toHaveBeenCalled()
    })
  })

  describe('getTask', () => {
    it('should return task', async () => {
      const taskId = 'test-task-id'
      const expected: Task = {
        id: taskId,
        account_id: 1,
        schedule_id: scheduleId,
        start_time: new Date(),
        duration: 100,
        type: 'BREAK',
        schedule,
        created_at: new Date(),
        updated_at: new Date()
      }
      jest.spyOn(tasksService, 'getTask').mockResolvedValueOnce(expected);

      const result = await tasksController.getTask(taskId)

      expect(expected).toBe(result);
      expect(tasksService.getTask).toHaveBeenCalled()
    })

    it('should throw an error if task does not exists', async () => {
      const taskId = 'invalid-id'
      jest.spyOn(tasksService, 'getTask').mockResolvedValueOnce(null);

      await expect(tasksController.getTask(taskId)).rejects.toThrow(NotFoundException)
    })
  })

  describe('updateTask', () => {
    it('should update and return updated task', async () => {
      const taskId = 'test-task-id'
      const expected: Task = {
        id: taskId,
        account_id: 1,
        schedule_id: scheduleId,
        start_time: new Date(),
        duration: 100,
        type: 'BREAK',
        schedule,
        created_at: new Date(),
        updated_at: new Date()
      }
      jest.spyOn(tasksService, 'updateTask').mockResolvedValueOnce(expected);

      const result = await tasksController.updateTask(taskId, {
        account_id: 1,
        start_time: new Date(),
        schedule_id: scheduleId,
        duration: 100,
        type: 'BREAK',
      })

      expect(expected).toBe(result);
      expect(tasksService.updateTask).toHaveBeenCalled()
    })
  })

  describe('deleteTask', () => {
    it('should delete task', async () => {
      const taskId = 'test-task-id'
      jest.spyOn(tasksService, 'deleteTask');

      await tasksController.deleteTask(taskId)

      expect(tasksService.deleteTask).toHaveBeenCalled()
    })
  })

  
})
