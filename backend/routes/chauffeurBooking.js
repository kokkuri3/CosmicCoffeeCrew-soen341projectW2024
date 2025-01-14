const express = require('express')

const router = express.Router()

//controller functions
const{getBooking, updateBooking, recordBooking, getBookings, getUserBookings, getChauffeurBookings,deleteBooking, rateBooking }= require('../controllers/chauffeurBookingController')


// //booking route
router.post('/book', recordBooking)

//get all booking route
router.get('/', getBookings)

//get all booking route
router.get('/:id', getBooking)


//get a specific user's booking
router.get('/user/:userID', getUserBookings)

//get a specific chauffeurs's booking
router.get('/chauffeur/:chauffeurID',  getChauffeurBookings)

//Delete a booking based on ID
router.delete('/:id', deleteBooking )

//Update booking based on ID
router.patch('/:id',updateBooking)

router.patch('/rate/:id', rateBooking)
module.exports = router