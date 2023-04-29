const Accommodation = require('../models/accommodation')

const seedAccommodations = async () => {
  try {
    await Accommodation.deleteMany()
    await Accommodation.create([
      {
        name: 'Hotel 1',
        address: 'Some hotel address',
        type: 'hotel',
        price: 2000,
        size_sqm: 800,
        meters_from_uplb: 200,
        min_pax: 1,
        max_pax: 2,
        num_rooms: 1,
        num_beds: 2,
        num_views: 0,
        furnishing: 'fully_furnished',
      },
      {
        name: 'Hotel 2',
        address: 'Some hotel address',
        type: 'hotel',
        price: 10000,
        size_sqm: 800,
        meters_from_uplb: 500,
        min_pax: 2,
        max_pax: 5,
        num_rooms: 3,
        num_beds: 5,
        num_views: 0,
        furnishing: 'fully_furnished',
      },
      {
        name: 'Apartment',
        address: 'Some apt address',
        type: 'apartment',
        price: 1000,
        size_sqm: 400,
        meters_from_uplb: 100,
        min_pax: 1,
        max_pax: 1,
        num_rooms: 1,
        num_beds: 1,
        num_views: 0,
        furnishing: 'semifurnished',
      },
      {
        name: 'Bedspace',
        address: 'Some bedspace address',
        type: 'bedspace',
        price: 500,
        size_sqm: 100,
        meters_from_uplb: 50,
        min_pax: 1,
        max_pax: 4,
        num_rooms: 1,
        num_beds: 4,
        num_views: 0,
        furnishing: 'unfurnished',
      },
      {
        name: 'Dormitory',
        address: 'Some dorm address',
        type: 'dormitory',
        price: 1250,
        size_sqm: 250,
        meters_from_uplb: 125,
        min_pax: 2,
        max_pax: 4,
        num_rooms: 2,
        num_beds: 4,
        num_views: 0,
        furnishing: 'semifurnished',
      },
      {
        name: 'Transient',
        address: 'Some transient address',
        type: 'transient',
        price: 800,
        size_sqm: 200,
        meters_from_uplb: 800,
        min_pax: 1,
        max_pax: 1,
        num_rooms: 1,
        num_beds: 1,
        num_views: 0,
        furnishing: 'fully_furnished',
      },
    ])
    console.log('seed accommodations!')
  } catch (err) {
    console.error(err)
  }
}

module.exports = seedAccommodations
