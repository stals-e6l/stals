const { faker } = require('@faker-js/faker')
const Accommodation = require('../models/v3/accommodation')
const User = require('../models/v3/user')

const accommodationTypeEnum = [
  'hotel',
  'apartment',
  'bedspace',
  'dormitory',
  'transient',
]

const accommodationFurnishingEnum = [
  'unfurnished',
  'semifurnished',
  'fully_furnished',
]

const accomms = userId =>
  Array.from(Array(100)).map(_ => ({
    user_id: userId,
    name: faker.company.name(),
    description: faker.lorem.paragraph(),
    image: {
      url: faker.image.url(),
    },
    address:
      faker.location.streetAddress({ useFullAddress: true }) +
      faker.location.city() +
      faker.location.country(),
    type: accommodationTypeEnum[
      Math.floor(Math.random() * accommodationTypeEnum.length)
    ],
    furnishing:
      accommodationFurnishingEnum[
        Math.floor(Math.random() * accommodationFurnishingEnum.length)
      ],
    min_price: faker.number.int({ min: 1000, max: 4000 }),
    max_price: faker.number.int({ min: 4001, max: 10000 }),
    size_sqm: faker.number.int({ min: 50, max: 500 }),
    meters_from_uplb: faker.number.int({ min: 100, max: 20000 }),
    min_pax: 1,
    max_pax: faker.number.int({ min: 2, max: 5 }),
    num_rooms: faker.number.int({ min: 1, max: 4 }),
    num_beds: faker.number.int({ min: 1, max: 4 }),
    num_views: faker.number.int({ min: 0, max: 100 }),
    landmarks: Array.from(Array(faker.number.int({ min: 0, max: 5 }))).map(_ =>
      faker.lorem.words()
    ),
    cooking_rules: Array.from(Array(faker.number.int({ min: 0, max: 5 }))).map(
      _ => faker.lorem.words()
    ),
    pet_rules: Array.from(Array(faker.number.int({ min: 0, max: 5 }))).map(_ =>
      faker.lorem.words()
    ),
    other_rules: Array.from(Array(faker.number.int({ min: 0, max: 5 }))).map(
      _ => faker.lorem.words()
    ),
    safety_and_security: Array.from(
      Array(faker.number.int({ min: 0, max: 5 }))
    ).map(_ => faker.lorem.words()),
    appliances: Array.from(Array(faker.number.int({ min: 0, max: 5 }))).map(_ =>
      faker.lorem.words()
    ),
    is_soft_deleted: faker.datatype.boolean(),
  }))

const seedAccommodations = async () => {
  try {
    await User.deleteMany()
    await Accommodation.deleteMany()
    const user = await User.create({
      username: 'john.doe',
      email: 'john.doe@gmail.com',
      password: 'Password123$',
      role: 'owner',
      full_name: {
        first_name: 'John',
        middle_name: 'Magnifico',
        last_name: 'Doe',
      },
      gender: 'male',
      address: {
        home: faker.location.city(),
        current: faker.location.city(),
      },
      birthday: '2001-05-02',
      organization: 'JohnDoe Residences',
      phone: {},
      biography: faker.lorem.paragraph(),
    })
    await Accommodation.create(accomms(user._id))
    console.log('seed accommodations!')
  } catch (err) {
    console.error(err)
  }
}

module.exports = seedAccommodations
