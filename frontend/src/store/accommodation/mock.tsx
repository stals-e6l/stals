import { faker } from '@faker-js/faker'

const mockAccommodations: IAccommodation[] = Array.from(Array(3)).map(_ => ({
  _id: faker.database.mongodbObjectId(),
  owner_id: faker.database.mongodbObjectId(),
  description: faker.lorem.paragraph(),
  name: faker.random.words(),
  address: faker.address.streetAddress(),
  type: 'hotel',
  price: faker.datatype.number(),
  size_sqm: faker.datatype.number(),
  meters_from_uplb: faker.datatype.number(),
  landmarks: Array.from(Array(2)).map(_ => faker.lorem.lines(1)),
  min_pax: 1,
  max_pax: 5,
  num_rooms: 3,
  num_beds: 5,
  num_views: faker.datatype.number(),
  furnishing: 'fully_furnished',
  cooking_rules: Array.from(Array(2)).map(_ => faker.lorem.lines(1)),
  pet_rules: Array.from(Array(2)).map(_ => faker.lorem.lines(1)),
  other_rules: Array.from(Array(2)).map(_ => faker.lorem.lines(1)),
  safety_and_security: Array.from(Array(2)).map(_ => faker.lorem.lines(1)),
  appliances: Array.from(Array(2)).map(_ => faker.lorem.lines(1)),
  amenities: Array.from(Array(2)).map(_ => faker.lorem.lines(1)),
  created_at: String(faker.date.recent()),
  updated_at: String(faker.date.past()),
  is_soft_deleted: faker.datatype.boolean(),
}))

export { mockAccommodations }
