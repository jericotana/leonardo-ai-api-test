import { z } from 'zod';
import { TasksType } from '@prisma/client';

export const scheduleSchema = z
  .object({
    id: z.string().uuid(),
    account_id: z.number(),
    agent_id: z.number(),
    start_time: z.date(),
    end_time: z.date(),
    created_at: z.date(),
    updated_at: z.date(),
  })
  .required()

export type Schedule = z.infer<typeof scheduleSchema>

export const createScheduleSchema = z
  .object({
    account_id: z.number(),
    agent_id: z.number(),
    start_time: z.string().datetime(),
    end_time: z.string().datetime(),
  })
  .required()

export type CreateScheduleDto = z.infer<typeof createScheduleSchema>

export const updateScheduleSchema = z
  .object({
    account_id: z.number().optional(),
    agent_id: z.number().optional(),
    start_time: z.string().datetime().optional(),
    end_time: z.string().datetime().optional(),
  })

export type UpdateScheduleDto = z.infer<typeof updateScheduleSchema>

export const createTaskScheduleSchema = z
  .object({
    account_id: z.number(),
    start_time: z.string().datetime(),
    duration: z.number(),
    type: z.nativeEnum(TasksType),
  })
  .required()

export type CreateTaskScheduleDto = z.infer<typeof createTaskScheduleSchema>