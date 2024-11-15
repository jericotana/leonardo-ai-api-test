import { z } from 'zod';
import { scheduleSchema  } from '@/modules/schedules/schedules.schema';
import { TasksType } from '@prisma/client';

export const taskSchema = z
  .object({
    id: z.string().uuid(),
    account_id: z.number(),
    schedule_id: z.string().uuid(),
    start_time: z.date(),
    duration: z.number(),
    schedule: scheduleSchema,
    type: z.nativeEnum(TasksType),
    created_at: z.date(),
    updated_at: z.date(),
  })
  .required()

export type Task = z.infer<typeof taskSchema>

export const updateTaskSchema = z
  .object({
    account_id: z.number().optional(),
    schedule_id: z.string().uuid().optional(),
    start_time: z.date().optional(),
    duration: z.number().optional(),
    type: z.nativeEnum(TasksType).optional(),
  })

export type UpdateTaskDto = z.infer<typeof updateTaskSchema>

