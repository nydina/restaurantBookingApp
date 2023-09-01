const express = require('express');
const router = express.Router();
const { Spot } = require('../db.js')

// POST: create a new spot
router.post('/spots', async (req, res, next) => {
  try {
    await Spot.create();
    res.json({ message: "New spot added" });
  } catch (error) {
    // Handle errors
    next(error);
  }
});

// DELETE a spot
router.delete('/spots', async (req, res, next) => {
  try {
    const { id } = req.body;

    if (!id || typeof id !== 'number' || !Number.isInteger(id)) {
      return res.status(422).json({ error: "Invalid spot_id. It should be a whole number" });
    }

    const deletedSpot = await Spot.destroy({
      where: {
        id: id
      }
    });

    if (deletedSpot === 0) {
      return res.status(404).json({ error: `Spot with id:${id} not found` });
    }

    res.json({ message: `Spot with id:${id} was deleted` });
  } catch (error) {
    // Handle errors
    next(error);
  }
});

 // Get Spots
 router.get('/spots', (req, res, next) => {
  res.json(
    { "spots": [
      {
        id: 1
    }]
    }
  )
});

// PUT: Update a spot
router.put('/spots', (req, res, next) => {
  
});
module.exports = router;
