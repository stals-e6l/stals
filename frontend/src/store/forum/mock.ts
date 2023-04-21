import { faker } from '@faker-js/faker'

export const mockForums: IForum[] = Array.from(Array(5)).map(() => ({
  accommodation_id: faker.database.mongodbObjectId(),
  is_public: true,
  status: 'active',
  content: Array.from(Array(5)).map(() => faker.lorem.lines(3)),
  _id: faker.database.mongodbObjectId(),
}))
