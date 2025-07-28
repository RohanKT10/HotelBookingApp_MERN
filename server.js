const express = require("express");
const app = express();

// Importing database configuration...
console.log('Importing database configuration...');
const dbConfig = require('./db')

const roomsRoute = require('./routes/roomsRoute')

// Adding middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Adding routes...
console.log('Adding routes...');
app.use('/api/rooms', roomsRoute);

const usersRoute = require('./routes/usersRoute'); // Corrected import path
app.use('/api/users', usersRoute);

const bookingsRoute= require('./routes/bookingsRoute')
app.use('/api/bookings',bookingsRoute)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Node Server Started using nodemon'));
