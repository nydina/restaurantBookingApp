const { Sequelize, DataTypes } = require('sequelize');

// Create a new instance of Sequelize and connect to the database
// const sequelize = new Sequelize('postgres://drazafindratsira:@127.0.0.1:5432/postgres');
const sequelize = new Sequelize('postgres://cokrdtyw:BdilfQR8AiVDB2IMiMkdX7HiDpaMrr11@trumpet.db.elephantsql.com/cokrdtyw');

// Define the Reservation model
const Reservation = sequelize.define('Reservation', {
    number_of_guests: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    reservation_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    reservation_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    reservation_note: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    reservation_status: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

// Define the Room model
const Room = sequelize.define('Room', {});

// Define the Spot model
const Spot = sequelize.define('Spot', {});

// Define the User model
const User = sequelize.define('User', {
    user_role: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    firstname: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    user_password: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
});

// Synchronize the Reservation model with the database
Reservation.sync({ force: true }).then(() => {
   console.log("The table for the Reservation model was just (re)created!")
});

// Synchronize the Room model with the database
// Room.sync({ force: true }).then(() => {
//     console.log("The table for the Room model was just (re)created!")
// });

// Synchronize the Spot model with the database
// Spot.sync({ force: true }).then(() => {
//     console.log("The table for the Spot model was just (re)created!")
// });

// Synchronize the User model with the database
// User.sync({ force: true }).then(() => {
//     console.log("The table for the User model was just (re)created!")
// });

module.exports = {
    Reservation,
    Room,
    Spot,
    User
};