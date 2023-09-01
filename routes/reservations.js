const express = require('express');
const router = express.Router();

const { Reservation } = require('../db.js')

// POST: create a new reservation
router.post('/reservations', async (req, res, next) => {
  try {
    const {
      user_id,
      spot_id,
      room_id,
      number_of_guests,
      reservation_date,
      reservation_name,
      reservation_note,
      reservation_status
    } = req.body;

    const isInteger = (value) => typeof value === 'number' && Number.isInteger(value);

    // Validate user_id
    if (user_id && !isInteger(user_id)) {
      return res.status(422).json({ error: "The user_id should be a whole number" });
    }

    // Validate spot_id and room_id (optional)
    if (spot_id !== undefined && !isInteger(spot_id)) {
      return res.status(422).json({ error: "The spot_id should be a non-negative whole number" });
    }
    if (room_id !== undefined && !isInteger(room_id)) {
      return res.status(422).json({ error: "The room_id should be a non-negative whole number" });
    }
    if (!spot_id && !room_id) {
      return res.status(422).json({ error: "You should either state a room or a spot" });
    }

    // Validate number_of_guests
    if (!isInteger(number_of_guests)) {
      return res.status(422).json({ error: "The number_of_guests should be a whole number" });
    }

    // Validate reservation_date
    const parsed_reservation_date = new Date(reservation_date);
    const current_date = new Date();
    const six_months_later = new Date();
    six_months_later.setMonth(current_date.getMonth() + 6);

    if (!(parsed_reservation_date instanceof Date && !isNaN(parsed_reservation_date) && parsed_reservation_date >= current_date && parsed_reservation_date <= six_months_later)) {
      return res.status(422).json({ error: "Invalid reservation_date. It should be a valid date within the next 6 months." });
    }

    // Validate reservation_name
    if (typeof reservation_name !== 'string') {
      return res.status(422).json({ error: "The reservation_name should be a string" });
    }

    // Validate reservation_note (optional)
    if (reservation_note !== undefined && (typeof reservation_note !== 'string' || reservation_note.length > 1000)) {
      return res.status(422).json({ error: "The reservation_note should be a string with a maximum length of 1000 characters" });
    }

    // Validate status
    if (!isInteger(reservation_status) || reservation_status < 0 || reservation_status > 4) {
      return res.status(422).json({ error: "The status should be an integer between 0 and 4" });
    }

    // Create a reservation and save it to the database
    await Reservation.create({
      number_of_guests,
      reservation_date,
      reservation_name,
      reservation_note,
      reservation_status,
      room_id,
      spot_id
    });
    res.status(201).json({ message: "Reservation registered" });

  } catch (error) {
    // Handle errors
    next(error);
  }
});

// GET: read reservations
router.get('/reservations', async (req, res, next) => {
  try {
    const reservations = await Reservation.findAll();
    res.json({ reservations });
  } catch (error) {
    next(error);
  }
});

// PUT: update a reservation
router.put('/reservations/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      number_of_guests,
      reservation_date,
      reservation_name,
      reservation_note,
      reservation_status,
      room_id,
      spot_id
    } = req.body;

    const reservation = await Reservation.findByPk(id);

    if (!reservation) {
      return res.status(404).json({ error: `Reservation with id:${id} not found` });
    }

    // Update the reservation attributes
    reservation.number_of_guests = number_of_guests;
    reservation.reservation_date = reservation_date;
    reservation.reservation_name = reservation_name;
    reservation.reservation_note = reservation_note;
    reservation.reservation_status = reservation_status;
    reservation.room_id = room_id;
    reservation.spot_id = spot_id;

    await reservation.save();

    res.json({ message: "Reservation updated successfully" });
  } catch (error) {
    next(error);
  }
});

// DELETE a reservation
router.delete('/reservations', async (req, res, next) => {
  try {
    const { id } = req.body;

    if (!id || typeof id !== 'number' || !Number.isInteger(id)) {
      return res.status(422).json({ error: "Invalid reservation_id. It should be a whole number" });
    }

    const deletedReservation = await Reservation.destroy({
      where: {
        id: id
      }
    });

    if (deletedReservation === 0) {
      return res.status(404).json({ error: `Reservation with id:${id} not found` });
    }

    res.json({ message: `Reservation with id:${id} was deleted` });
  } catch (error) {
    // Handle errors
    next(error);
  }
});

module.exports = router;

/* Examples on Postman
POST
{
  "number_of_guests": 5,
  "reservation_date": "2023-10-10",
  "reservation_name": "John Doe",
  "reservation_note": "Rooftop preference",
  "reservation_status": 1,
  "room_id": 2,
  "spot_id": 1
}
PUT
{
  "number_of_guests": 3,
  "reservation_date": "2023-09-10",
  "reservation_name": "John Doe",
  "reservation_note": "Special request for a window table",
  "reservation_status": 1,
  "room_id": 2,
  "spot_id": 1
}
DELETE
{
  "id": 1
}
*/
