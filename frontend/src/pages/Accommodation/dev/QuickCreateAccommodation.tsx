import React from 'react'
import { createAccommodation } from '../../../store/accommodation/actions'
import { faker } from '@faker-js/faker'

interface IProps {
  children?: React.ReactNode
}

const QuickCreateAccommodation: React.FC<IProps> = () => {
  const createAccommodationHandler = createAccommodation()
  return (
    <button
      onClick={() => {
        createAccommodationHandler({
          name: faker.address.secondaryAddress(),
          description: faker.lorem.paragraphs(2),
          address: `${faker.address.city()}, ${faker.address.country()}, ${faker.address.zipCode()}`,
          type: 'apartment',
          price: faker.datatype.float({ min: 0 }),
          size_sqm: faker.datatype.float({ min: 0 }),
          meters_from_uplb: faker.datatype.float({ min: 0 }),
          landmarks: [],
          min_pax: faker.datatype.number({
            min: 0,
            max: 10,
          }) as unknown as number,
          max_pax: faker.datatype.number({
            min: 0,
            max: 10,
          }) as unknown as number,
          num_rooms: faker.datatype.number({
            min: 0,
            max: 10,
          }) as unknown as number,
          num_beds: faker.datatype.number({
            min: 0,
            max: 10,
          }) as unknown as number,
          num_views: faker.datatype.number({
            min: 0,
            max: 10,
          }) as unknown as number,
          furnishing: 'semifurnished',
          cooking_rules: [],
          pet_rules: [],
          other_rules: [],
          safety_and_security: [],
          appliances: [],
          amenities: [],
          //   created_at: 'date',
          //   updated_at: 'date',
          is_soft_deleted: false,
        })
      }}
    >
      Create Quick Accommodation
    </button>
  )
}

export default QuickCreateAccommodation
