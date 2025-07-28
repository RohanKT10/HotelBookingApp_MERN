
const express = require("express");
const router = express.Router();

const Booking = require("../models/booking");
const Room = require("../models/room");

router.post("/bookroom", async (req, res) => {
const { room, fromdate, todate, totalDays, totalamount, userid  } = req.body;

try{
    const newbooking = new Booking({
        userid,
        room:room.name,
        roomid:room._id,
        totalDays,
        fromdate,
        todate,
        totalamount,
        transactionid: "1234",
    })

    const  booking= await newbooking.save()
    res.send('Room booked successfully')
      }catch(error)
  {
    return res.status(400).json({ message: error });
   }

 })


 router.post("/cancelbooking", async (req, res) => {
  const { bookingid, roomid } = req.body;

  try {
    // Find the booking item and update its status to "cancelled"
    const bookingItem = await Booking.findOne({ _id: bookingid });
    if (!bookingItem) {
      return res.status(404).json({ message: "Booking not found" });
    }
    bookingItem.status = 'cancelled';
    await bookingItem.save();

    // Find the room and update its current bookings
    const room = await Room.findOne({ _id: roomid });
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    room.currentbookings = room.currentbookings.filter(booking => booking.bookingid.toString() !== bookingid);
    await room.save();

    // Send success response
    res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling booking:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


 router.post("/getuserbookings", async (req, res) => {
  const { userid } = req.body;
  try {
    const bookings = await Booking.find({ userid: userid }).sort({ _id: -1 });
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
});

router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find({});
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;