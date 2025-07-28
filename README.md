# Hotel Booking App (MERN)

A full-stack hotel room booking system built with MongoDB, Express.js, React, and Node.js. This application allows users to register, log in, browse available hotel rooms, and make bookings based on selected dates. Each user can view and cancel their bookings. An admin panel provides functionality to manage rooms, view all bookings, and manage registered users.

## Features
- User registration and authentication
- Browse hotel rooms with details and images
- Book rooms for selected date ranges
- Cancel existing bookings
- Admin panel to add/remove rooms, view users and bookings

## Project Structure
```
project-root/
├── hotelbooking/ # React frontend (contains src/)
│ └── src/
├── models/ # Mongoose schemas
├── routes/ # Express API routes
├── db.js # MongoDB connection
├── server.js # Express backend entry point
├── package.json
```
