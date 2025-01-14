const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
make: Represents the make of the vehicle (e.g., Toyota, Honda).
model: Represents the model of the vehicle (e.g., Camry, Civic).
year: Represents the year the vehicle was manufactured.
type: Represents the type of the vehicle (e.g., sedan, SUV).
color: Represents the color of the vehicle.
mileage: Represents the current mileage of the vehicle.
transmission: Represents the type of transmission (e.g., automatic, manual).
fuelType: Represents the type of fuel the vehicle uses (e.g., gasoline, diesel).
seats: Represents the number of seats in the vehicle.
pricePerDay: Represents the rental price per day for the vehicle.
available: Represents whether the vehicle is available for rental.
description: Represent a small description of the vehicle.
image: Stores image link and gets fetched in frontend.
numOfRatings stores the number of ratings.
total rating is self explanatory.
reviews is an array storing information about different reservation
*/

const vehicleSchema = new Schema({
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['sedan', 'SUV', 'truck', 'van', 'convertible', 'other','sport'],
    required: true
  },
  color: {
    type: String,
    required: true
  },
  licensePlateNumber: {
    type: String,
    required: true
  },
  mileage: {
    type: Number,
    required: true
  },
  transmission: {
    type: String,
    enum: ['automatic', 'manual'],
    required: true
  },
  location: {
    type: String,
    enum: ['Montreal', 'Ottawa','Toronto','Vancouver','Halifax','Edmonton'],
    required: true
  },
  fuelType: {
    type: String,
    enum: ['gasoline', 'diesel', 'electric', 'hybrid'],
    required: true
  },
  seats: {
    type: Number,
    required: true
  },
  pricePerDay: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  //NEXT IS THE LINK WITH THE RESERVATIONS
  numOfRatings:{
    type: Number,
    default : 0
  },
  totalRating: {
    type: Number,
    default: 0  // Default to 0 if no ratings exist yet
  },
  reviews: [{
    userID: String,
    username: String,
    msg: String,
    rating: Number
  }]

});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
