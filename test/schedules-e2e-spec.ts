import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { SchedulesModule } from '@/modules/schedules/schedules.module';
import { PrismaClient } from '@prisma/client'
import { PrismaService } from '@/common/providers/prisma/prisma.service';
import { SchedulesService } from '@/modules/schedules/schedules.service';
import { TasksService } from '@/modules/tasks/tasks.service';
import { mockDeep } from 'jest-mock-extended'
import { schedules } from './fixtures.ts/schedules';
import { tasks } from './fixtures.ts/taskts';

describe('Schedules endpoint', () => {
  let app: INestApplication;
  let schedulesService: SchedulesService;
  let tasksService: TasksService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SchedulesModule],
      providers: [SchedulesService, TasksService, PrismaService],
    })
    .overrideProvider(PrismaService)
    .useValue(mockDeep<PrismaClient>())
    .compile();

    schedulesService = module.get(SchedulesService)
    tasksService = module.get(TasksService)

    app = module.createNestApplication();
    await app.init();
  });

  describe('GET /schedules', () => {
    it('should return status 200 and all schedules', async () => {
      jest.spyOn(schedulesService, 'getSchedules').mockResolvedValueOnce(schedules)

      const result = await request(app.getHttpServer())
        .get('/schedules')

      expect(result.body.length).toEqual(schedules.length)
      expect(result.status).toEqual(200)
    });

    it('should return 400 error when query params is invalid', async () => {
      const invalidQueryParams = 'account_id=invalid-id'

      const result = await request(app.getHttpServer())
        .get(`/schedules?${invalidQueryParams}`)

      expect(result.status).toEqual(400)
    });
  })

  describe('GET /schedules/:scheduleId', () => {
    it('should return status 200 and schedule', async () => {
      const schedule = schedules[0]
      jest.spyOn(schedulesService, 'getSchedule').mockResolvedValueOnce(schedule)

      const result = await request(app.getHttpServer())
        .get(`/schedules/${schedule.id}`)

      expect(result.body.id).toEqual(schedule.id)
      expect(result.status).toEqual(200)
    });

    it('should return 400 error when scheduleId is not valid', async () => {
      const invalidScheduleId = 'invalidId'

      const result = await request(app.getHttpServer())
        .get(`/schedules/${invalidScheduleId}`)

      expect(result.status).toEqual(400)
    });
  })

  describe('POST /schedules', () => {
    it('should return status 201 and the newly created schedule', async () => {
      const schedule = schedules[0]
      jest.spyOn(schedulesService, 'createSchedule').mockResolvedValueOnce(schedule)

      const result = await request(app.getHttpServer())
        .post(`/schedules`)
        .send(schedule)

      expect(result.body.id).toEqual(schedule.id)
      expect(result.status).toEqual(201)
    });

    it('should return 400 error when request body is invalid', async () => {
      const invalidBody = {}

      const result = await request(app.getHttpServer())
        .post(`/schedules`)
        .send(invalidBody)
  
      expect(result.status).toEqual(400)
    });
  })

  describe('PUT /schedules/:scheduleId', () => {
    it('should return status 200 and the newly updated schedule', async () => {
      const schedule = schedules[0]
      jest.spyOn(schedulesService, 'getSchedule').mockResolvedValueOnce(schedule)
      jest.spyOn(schedulesService, 'updateSchedule').mockResolvedValueOnce(schedule)

      const result = await request(app.getHttpServer())
        .put(`/schedules/${schedule.id}`)
        .send({
          account_id: 1
        })

      expect(result.body.id).toEqual(schedule.id)
      expect(result.status).toEqual(200)
    });

    it('should return 400 error when request body is invalid', async () => {
      const schedule = schedules[0]
      const invalidBody = { account_id: 'invalid-id' }

      const result = await request(app.getHttpServer())
        .put(`/schedules/${schedule.id}`)
        .send(invalidBody)
  
      expect(result.status).toEqual(400)
    });

    it('should return 404 error when schedule does not exists', async () => {
      const schedule = schedules[0]
      jest.spyOn(schedulesService, 'getSchedule').mockResolvedValueOnce(null)

      const result = await request(app.getHttpServer())
        .put(`/schedules/${schedule.id}`)
        .send({
          account_id: 1
        })
  
      expect(result.status).toEqual(404)
    });
  })

  describe('DELETE /schedules/:scheduleId', () => {
    it('should return status 200 when scheduleId is valid', async () => {
      const schedule = schedules[0]
      jest.spyOn(schedulesService, 'getSchedule').mockResolvedValueOnce(schedule)
      jest.spyOn(schedulesService, 'deleteSchedule').mockResolvedValueOnce()

      const result = await request(app.getHttpServer())
        .delete(`/schedules/${schedule.id}`)

      expect(result.status).toEqual(200)
    });


    it('should return 404 error when schedule does not exists', async () => {
      const schedule = schedules[0]
      jest.spyOn(schedulesService, 'getSchedule').mockResolvedValueOnce(null)

      const result = await request(app.getHttpServer())
        .delete(`/schedules/${schedule.id}`)
  
      expect(result.status).toEqual(404)
    });
  })

  describe('POST /schedules/:scheduleId/tasks', () => {
    it('should return status 201 and the newly created tasks', async () => {
      const schedule = schedules[0]
      const task = tasks[0]
      jest.spyOn(schedulesService, 'getSchedule').mockResolvedValueOnce(schedule)
      jest.spyOn(tasksService, 'createTask').mockResolvedValueOnce(task)

      const result = await request(app.getHttpServer())
        .post(`/schedules/${schedule.id}/tasks`)
        .send(task)

      expect(result.body.id).toEqual(task.id)
      expect(result.status).toEqual(201)
    });

    it('should return 404 error when schedule does not exists', async () => {
      const schedule = schedules[0]
      const task = tasks[0]
      jest.spyOn(schedulesService, 'getSchedule').mockResolvedValueOnce(null)

      const result = await request(app.getHttpServer())
        .post(`/schedules/${schedule.id}/tasks`)
        .send(task)

      expect(result.status).toEqual(404)
    });
  })
});
