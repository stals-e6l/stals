const faker = require("faker");
const Accommodation = require('../models/accommodation')

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

const accomms = Array.from(Array(100)).map(_ => ({
  name: faker.company.name(),
  address: faker.location.streetAddress({ useFullAddress: true }) + faker.address.city() + faker.address.country(),
  type: accommodationTypeEnum[Math.floor(Math.random()*accommodationTypeEnum.length)],
  price: faker.number.int({ min: 1000, max: 20000 }),
  size_sqm: faker.number.int({ min: 50, max: 500 }),
  meters_from_uplb: faker.number.int({ min: 100, max: 20000 }),
  min_pax: 1,
  max_pax: faker.number.int({ min: 1, max: 5 }),
  num_rooms: faker.number.int({ min: 1, max: 4 }),
  num_beds: faker.number.int({ min: 1, max: 4 }),
  num_views: 0,
  furnishing: accommodationFurnishingEnum[Math.floor(Math.random()*accommodationFurnishingEnum.length)],
}))

const seedAccommodations = async () => {
  try {
    await Accommodation.deleteMany()
    await Accommodation.create(accomms)
    console.log('seed accommodations!')
  } catch (err) {
    console.error(err)
  }
}

module.exports = seedAccommodations