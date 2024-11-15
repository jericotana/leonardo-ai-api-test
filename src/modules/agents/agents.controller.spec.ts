
import { Test } from '@nestjs/testing';
import { AgentsController } from './agents.controller';
import { SchedulesService } from '@/modules/schedules/schedules.service';
import { PrismaClient } from '@prisma/client'
import { PrismaService } from '@/common/providers/prisma/prisma.service';
import { Schedule } from '@/modules/schedules/schedules.schema';
import { mockDeep } from 'jest-mock-extended'

describe('AgentsController', () => {
  let agentsController: AgentsController;
  let schedulesService: SchedulesService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AgentsController],
      providers: [SchedulesService, PrismaService],
    })
    .overrideProvider(PrismaService)
    .useValue(mockDeep<PrismaClient>())
    .compile();

    agentsController = module.get(AgentsController)
    schedulesService = module.get(SchedulesService)
  });

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('getAgentSchedules', () => {
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

      const result = await agentsController.getAgentSchedules(accountId)

      expect(expected).toBe(result);
      expect(schedulesService.getSchedules).toHaveBeenCalled()
    })
  })
})
