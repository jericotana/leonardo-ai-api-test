import { z } from 'zod';
import { scheduleSchema  } from '@/modules/schedules/schedules.schema';
import { TasksType } from '@prisma/client';

export const ALLOWED_TASKS_FIELDS_FOR_SORT = [
  "start_time",
  "duration",
  "created_at",
  "updated_at"
]

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

export const tasksQuerySchema = z
  .object({
    account_id: z.coerce.number().optional(),
    schedule_id: z.string().uuid().optional(),
    type: z.nativeEnum(TasksType).optional(),
    sort: z.string().optional(),
    skip: z.coerce.number().optional(),
    take: z.coerce.number().optional(),
    cursor: z.string().uuid().optional()
  })

export type TaskQuery = z.infer<typeof tasksQuerySchema>


export const updateTaskSchema = z
  .object({
    account_id: z.number().optional(),
    schedule_id: z.string().uuid().optional(),
    start_time: z.date().optional(),
    duration: z.number().optional(),
    type: z.nativeEnum(TasksType).optional(),
  })

export type UpdateTaskDto = z.infer<typeof updateTaskSchema>

