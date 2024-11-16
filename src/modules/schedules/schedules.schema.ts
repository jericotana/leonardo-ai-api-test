import { z } from 'zod';
import { TasksType } from '@prisma/client';

export const ALLOWED_SCHEDULES_FIELDS_FOR_SORT = [
  "start_time",
  "end_time",
  "created_at",
  "updated_at"
]

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

export const scheduleQuerySchema = z
  .object({
    account_id: z.coerce.number().optional(),
    agent_id: z.coerce.number().optional(),
    sort: z.string().optional(),
    skip: z.coerce.number().optional(),
    take: z.coerce.number().optional(),
    cursor: z.string().uuid().optional()
  })

export type ScheduleQuery = z.infer<typeof scheduleQuerySchema>

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