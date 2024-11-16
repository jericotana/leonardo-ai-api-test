import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TasksModule } from '@/modules/tasks/tasks.module';
import { PrismaClient } from '@prisma/client'
import { PrismaService } from '@/common/providers/prisma/prisma.service';
import { TasksService } from '@/modules/tasks/tasks.service';
import { mockDeep } from 'jest-mock-extended'
import { tasks } from './fixtures.ts/taskts';

describe('Tasks endpoint', () => {
  let app: INestApplication;
  let tasksService: TasksService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TasksModule],
      providers: [TasksService, PrismaService],
    })
    .overrideProvider(PrismaService)
    .useValue(mockDeep<PrismaClient>())
    .compile();

    tasksService = module.get(TasksService)

    app = module.createNestApplication();
    await app.init();
  });

  describe('GET /tasks', () => {
    it('should return status 200 and all tasks', async () => {
      jest.spyOn(tasksService, 'getTasks').mockResolvedValueOnce(tasks)

      const result = await request(app.getHttpServer())
        .get('/tasks')

      expect(result.body.length).toEqual(tasks.length)
      expect(result.status).toEqual(200)
    });

    it('should return 400 error when query params is invalid', async () => {
      const invalidQueryParams = 'account_id=invalid-id'

      const result = await request(app.getHttpServer())
        .get(`/tasks?${invalidQueryParams}`)

      expect(result.status).toEqual(400)
    });
  })

  describe('PUT /tasks/:taskId', () => {
    it('should return status 200 and the newly updated task', async () => {
      const task = tasks[0]
      jest.spyOn(tasksService, 'getTask').mockResolvedValueOnce(task)
      jest.spyOn(tasksService, 'updateTask').mockResolvedValueOnce(task)

      const result = await request(app.getHttpServer())
        .put(`/tasks/${task.id}`)
        .send({
          account_id: 1
        })

      expect(result.body.id).toEqual(task.id)
      expect(result.status).toEqual(200)
    });

    it('should return 400 error when request body is invalid', async () => {
      const task = tasks[0]
      const invalidBody = { account_id: 'invalid-id' }

      const result = await request(app.getHttpServer())
        .put(`/tasks/${task.id}`)
        .send(invalidBody)
  
      expect(result.status).toEqual(400)
    });

    it('should return 404 error when task does not exists', async () => {
      const task = tasks[0]
      jest.spyOn(tasksService, 'getTask').mockResolvedValueOnce(null)

      const result = await request(app.getHttpServer())
        .put(`/tasks/${task.id}`)
        .send({
          account_id: 1
        })
  
      expect(result.status).toEqual(404)
    });
  })

  describe('DELETE /tasks/:taskId', () => {
    it('should return status 200 when taskId is valid', async () => {
      const task = tasks[0]
      jest.spyOn(tasksService, 'getTask').mockResolvedValueOnce(task)
      jest.spyOn(tasksService, 'deleteTask').mockResolvedValueOnce()

      const result = await request(app.getHttpServer())
        .delete(`/tasks/${task.id}`)

      expect(result.status).toEqual(200)
    });


    it('should return 404 error when task does not exists', async () => {
      const task = tasks[0]
      jest.spyOn(tasksService, 'getTask').mockResolvedValueOnce(null)

      const result = await request(app.getHttpServer())
        .delete(`/tasks/${task.id}`)
  
      expect(result.status).toEqual(404)
    });
  })

});
