const mongoose = require("mongoose")

const User = require ('./userModel')
const Vehicle = require ('./vehicleModel')
const Schema = mongoose.Schema

/*
The reservation schema represents the structure of a reservation, one of the core features of our application
DO NOT CHANGE THE SCHEMA without looking at the reservationController file.
Also change the body passed from frontend
*/

const reservationSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    vehicleID: {
        type: String,
        required: true
    },
    start_Date: {
        type: Date,
        required: true
    },
    end_Date: {
        type: Date,
        required: true
    },
    charge: {
        type: Number,    //make integer later
        required: true, 
    },
    creditsUsed: {
        type: Number,
        default: 0,
        required: false
    },
    status :{
        type : String,
        enum:["pending","accepted","refused"],
        required:true
    },
    review: {
        type: String,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    }, 
    checkIn: {
        type: Boolean,
        required: true,
        default: false
      },
    checkOut: {
        type: Boolean,
        default: false,
        required: true
      },
      inDamageReport: {
          type: String,
          required: false,
          default: ""
      },
      outDamageReport: {
        type: String,
        required: false,
        default: ""
    },
      rentalAgreement: {
        type:Boolean,
        default: false
      }


})


reservationSchema.statics.record = async function(userID, vehicleID, start_Date, end_Date, charge, status, checkIn, checkOut){


    // validation
    if (!userID || !vehicleID || !start_Date || !end_Date || !charge ||!status){
        throw Error("All fields must be filled")
    }
    const user_Exists = await User.findById(userID)

    if(!user_Exists){
        return res.status(404).json({error: 'No such User'})
    }

    const vehicle_Exists = await Vehicle.findById(vehicleID)

    if(!vehicle_Exists){
        return res.status(404).json({error: 'No such Vehicle'})
    }


    const reservation = await this.create({userID, vehicleID, start_Date, end_Date, charge, status, checkIn, checkOut})

    return reservation
}
module.exports = mongoose.model('Reservation', reservationSchema)
