

import { Test } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client'
import { SchedulesValidationPipe } from './schedules.pipe';
import { SchedulesService } from './schedules.service';
import { PrismaService } from '@/common/providers/prisma/prisma.service';
import { mockDeep } from 'jest-mock-extended'
import { Schedule } from './schedules.schema';
import { NotFoundException } from '@nestjs/common';

describe('SchedulesValidationPipe', () => {
  let schedulesPipe: SchedulesValidationPipe;
  let schedulesService: SchedulesService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [SchedulesService, PrismaService],
    })
    .overrideProvider(PrismaService)
    .useValue(mockDeep<PrismaClient>())
    .compile();
    schedulesService = module.get(SchedulesService)
    schedulesPipe = new SchedulesValidationPipe(schedulesService)
  });

  describe('transform', () => {
    it('should return scheduleId when schedule exists', async () => {
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
      jest.spyOn(schedulesService, 'getSchedule').mockResolvedValueOnce(schedule);

      const result = schedulesPipe.transform(scheduleId)

      expect(result).toBe(result);
    });

    it('should throw a NotFoundException when schedule does not exists', async () => {
      const scheduleId = 'invalid-id'
      jest.spyOn(schedulesService, 'getSchedule').mockResolvedValueOnce(null);

      await expect(schedulesPipe.transform(scheduleId)).rejects.toThrow(NotFoundException)
    });
  });
});
