const express = require('express');
const router = express.Router();
const { Room } = require('../db.js')

// POST: create a new room
router.post('/rooms', async (req, res, next) => {
    try {
        const { id } = req.body;

        // if (!id || typeof id !== 'number' || !Number.isInteger(id)) {
        //     return res.status(422).json({ error: "Invalid room_id. It should be a whole number" });
        // }
        
        await Room.create();
        res.json({ message: "New room added" });
    } catch (error) {
        // Handle errors
        next(error);
    }
});

// GET Rooms
router.get('/rooms', async (req, res, next) => {
    try {
        const rooms = await Room.findAll();
        res.json({ rooms });
    } catch (error) {
        next(error);
    }
});

// PUT: Update an existing room by ID 📝 there is nothing to update in a room
router.put('/rooms/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        res.json({ message: `Room with id:${id} updated successfully` });
    } catch (error) {
        // Handle errors
        next(error);
    }
});

// DELETE a room
router.delete('/rooms', async (req, res, next) => {
    try {
        const { id } = req.body;

        if (!id || typeof id !== 'number' || !Number.isInteger(id)) {
            return res.status(422).json({ error: "Invalid room_id. It should be a whole number" });
        }

        const deletedRoom = await Room.destroy({
            where: {
                id: id
            }
        });

        if (deletedRoom === 0) {
            return res.status(404).json({ error: `Room with id:${id} not found` });
        }

        res.json({ message: `Room with id:${id} was deleted` });
    } catch (error) {
        // Handle errors
        next(error);
    }
});

module.exports = router;

/* Examples on Postman
DELETE
{
  "id": 1
}
*/
