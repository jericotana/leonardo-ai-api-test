import { Task } from "@/modules/tasks/tasks.schema";
import { faker } from '@faker-js/faker';
import { schedules } from "./schedules";

export const tasks: Task[] = [
  {
    id: faker.string.uuid(),
    account_id: 1,
    schedule_id: schedules[0].id,
    start_time: faker.date.recent({days: 3}),
    duration: 10,
    type: 'BREAK',
    schedule: schedules[0],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: faker.string.uuid(),
    account_id: 2,
    schedule_id: schedules[0].id,
    start_time: faker.date.recent({days: 3}),
    duration: 10,
    type: 'WORK',
    schedule: schedules[0],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: faker.string.uuid(),
    account_id: 3,
    schedule_id: schedules[0].id,
    start_time: faker.date.recent({days: 3}),
    duration: 10,
    type: 'BREAK',
    schedule: schedules[0],
    created_at: new Date(),
    updated_at: new Date()
  }
]