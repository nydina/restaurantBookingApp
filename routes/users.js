var express = require('express');
var router = express.Router();
const { User } = require('../db.js')

// POST: create a new user
router.post('/users', async (req, res, next) => {
  try {
    const {
      user_role,
      firstname,
      lastname,
      email,
      phone,
      user_password
    } = req.body;
    await User.create({
      user_role,
      firstname,
      lastname,
      email,
      phone,
      user_password
    });
    res.json({ message: "New user added" });
  } catch (error) {
    // Handle errors
    next(error);
  }
});

// DELETE a user
router.delete('/users', async (req, res, next) => {
  try {
    const { id } = req.body;

    if (!id || typeof id !== 'number' || !Number.isInteger(id)) {
      return res.status(422).json({ error: "Invalid user_id. It should be a whole number" });
    }

    const deletedUser = await User.destroy({
      where: {
        id: id
      }
    });

    if (deletedUser === 0) {
      return res.status(404).json({ error: `User with id:${id} not found` });
    }

    res.json({ message: `User with id:${id} was deleted` });
  } catch (error) {
    // Handle errors
    next(error);
  }
});

// Get Users
router.get('/users', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json({ users });
  } catch (error) {
    next(error);
  }
});

// PUT: update a user
router.put('/users', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json({ rooms });
  } catch (error) {
    next(error);
  }
});


module.exports = router;
