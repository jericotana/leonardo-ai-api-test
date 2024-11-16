import { Schedule } from "@/modules/schedules/schedules.schema";
import { faker } from '@faker-js/faker';

export const schedules: Schedule[] = [
  {
    id: faker.string.uuid(),
    account_id: 1,
    agent_id: 1,
    start_time: faker.date.recent({ days: 1}),
    end_time: faker.date.recent({ days: 2}),
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: faker.string.uuid(),
    account_id: 2,
    agent_id: 2,
    start_time: faker.date.recent({ days: 2}),
    end_time: faker.date.recent({ days: 3}),
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: faker.string.uuid(),
    account_id: 2,
    agent_id: 2,
    start_time: faker.date.recent({ days: 3}),
    end_time: faker.date.recent({ days: 4}),
    created_at: new Date('2024-11-16T07:03:01.413Z'),
    updated_at: new Date('2024-11-16T07:03:01.413Z')
  },
  {
    id: faker.string.uuid(),
    account_id: 3,
    agent_id: 3,
    start_time: faker.date.recent({ days: 3}),
    end_time: faker.date.recent({ days: 3}),
    created_at: new Date('2024-11-16T07:03:01.413Z'),
    updated_at: new Date('2024-11-16T07:03:01.413Z')
  }
]