const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const spotsRouter = require('./routes/spots');
const reservationsRouter = require('./routes/reservations');
const usersRouter = require('./routes/users');
const roomsRouter = require('./routes/rooms');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', spotsRouter);
app.use('/api', reservationsRouter);
app.use('/api', usersRouter);
app.use('/api', roomsRouter);

module.exports = app;
