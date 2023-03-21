const mongoose = require('mongoose');
const { connect } = require('./db');
const Accommodation = require('./models/Accommodation');
const Amenities = require('./models/Amenities');
const Appliances = require('./models/Appliances');
const AccommodationAmenities = require('./models/AccommodationAmenities');
const AccommodationAppliances = require('./models/AccommodationAppliances');

// Connect to the database
connect();

// Create a new accommodation
async function createAccommodation(owner_id, name, address, latitude, longitude, place_id, type, description, landmarks, size_sqm, min_pax, max_pax, price_min, price_max, num_views, num_rooms, num_beds, num_cr, location, furnishing, cooking_rules, pet_rules) {
    try {
      const newAccommodation = new Accommodation({
        owner_id,
        name,
        address,
        latitude,
        longitude,
        place_id,
        type,
        description,
        landmarks,
        size_sqm,
        min_pax,
        max_pax,
        price_min,
        price_max,
        num_views,
        num_rooms,
        num_beds,
        num_cr,
        location,
        furnishing,
        cooking_rules,
        pet_rules,
      });
    
      const savedAccommodation = await newAccommodation.save();
      console.log(savedAccommodation);
    } catch (error) {
      console.error(error);
    }
  }

// Retrieve all accommodations
async function getAllAccommodations() {
  try {
    const accommodations = await Accommodation.find();
    console.log(accommodations);
  } catch (err) {
    console.log(err);
  }
}

// Retrieve a specific accommodation by ID
async function getAccommodationById(accommodationId) {
  try {
    const accommodation = await Accommodation.findById(accommodationId);
    console.log(accommodation);
  } catch (err) {
    console.log(err);
  }
}

// Update a specific accommodation by ID
async function updateAccommodation(accommodationId, newName, newDescription, newPriceMin, newPriceMax) {
  try {
    const updatedAccommodation = await Accommodation.findByIdAndUpdate(
      accommodationId,
      {
        name: newName,
        description: newDescription,
        price_min: newPriceMin,
        price_max: newPriceMax
      },
      { new: true }
    );
    console.log(updatedAccommodation);
  } catch (err) {
    console.log(err);
  }
}

async function deleteAccommodation(accommodationId) {
    try {
      const deletedAccommodation = await Accommodation.findByIdAndDelete(accommodationId);
      console.log(deletedAccommodation);
    } catch (err) {
      console.log(err);
    }
  }
  
  async function createNewAmenity(name) {
    const newAmenity = new Amenities({
      name: name,
    });
    try {
      const amenity = await newAmenity.save();
      console.log(amenity);
    } catch (err) {
      console.log(err);
    }
  }
  
  async function createNewAppliance(name) {
    const newAppliance = new Appliances({
      name: name,
    });
    try {
      const appliance = await newAppliance.save();
      console.log(appliance);
    } catch (err) {
      console.log(err);
    }
  }
  
  async function createNewAccommodationAmenity(accommodation_id, amenity_id) {
    const newAccommodationAmenity = new AccommodationAmenities({
      accommodation: accommodation_id,
      amenities: amenity_id,
    });
    try {
      const accommodationAmenity = await newAccommodationAmenity.save();
      console.log(accommodationAmenity);
    } catch (err) {
      console.log(err);
    }
  }
  
  async function createNewAccommodationAppliance(accommodation_id, appliance_id) {
    const newAccommodationAppliance = new AccommodationAppliances({
      accommodation: accommodation_id,
      appliances: appliance_id,
    });
    try {
      const accommodationAppliance = await newAccommodationAppliance.save();
      console.log(accommodationAppliance);
    } catch (err) {
      console.log(err);
    }
  }
  
  async function retrieveAllAccommodationAmenities(accommodation_id) {
    try {
      const accommodationAmenities = await AccommodationAmenities.find({
        accommodation: accommodation_id,
      }).populate('amenities');
      console.log(accommodationAmenities);
    } catch (err) {
      console.log(err);
    }
  }
  
  async function retrieveAllAccommodationAppliances(accommodation_id) {
    try {
      const accommodationAppliances = await AccommodationAppliances.find({
        accommodation: accommodation_id,
      }).populate('appliances');
      console.log(accommodationAppliances);
    } catch (err) {
      console.log(err);
    }
  }
  
  async function updateAccommodationAmenities(accommodation_id, amenity_ids) {
    try {
      const result = await AccommodationAmenities.updateOne(
        { accommodation: accommodation_id },
        { amenities: amenity_ids }
      );
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }
  
  async function updateAccommodationAppliances(accommodation_id, appliance_ids) {
    try {
      const result = await AccommodationAppliances.updateOne(
        { accommodation: accommodation_id },
        { appliances: appliance_ids }
      );
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }
  
  async function deleteAccommodationAmenityById(accommodation_amenity_id) {
    try {
      const accommodationAmenity = await AccommodationAmenities.findByIdAndDelete(
        accommodation_amenity_id
      );
      console.log(accommodationAmenity);
    } catch (err) {
      console.log(err);
    }
  }
  
  async function deleteAccommodationApplianceById(accommodation_appliance_id) {
    try {
        const accommodationAppliance = await AccommodationAppliances.findByIdAndDelete(
            { accommodation: accommodation_id },
            { appliances: appliance_id },
          );
          console.log(accommodationAppliance);
        } catch (err) {
          console.log(err);
        }
      }