const express = require("express");
const router = express.Router();

const Room= require('../models/room')

router.get("/getallrooms",async(req,res)=>{

    try {
        const rooms = await Room.find({}) 
         res.send({ rooms });
        } 
        catch (error) {
            console.error("Error fetching rooms:", error);
            return res.status(400).json({ message: error });
        }
    


});

router.post("/getroombyid",async(req,res)=>{

    const roomid=req.body.roomid
    console.log("Room ID:", roomid);

    try {
        const room = await Room.findOne({ _id: roomid });
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }
         res.send({ room });
        } 
        catch (error) {
            console.error("Error fetching rooms:", error);
            return res.status(400).json({ message: error });
        }
    


});


router.post("/addroom", async(req, res) => {
    const { room , 
       rentperday, maxcount ,description ,phonenumber ,type ,image1 ,image2 ,image3} = req.body
  
       const newroom = new Room({
            name : room,
            rentperday, 
            maxcount , description , phonenumber , type , imageurls:[image1 , image2 ,image3] , currentbookings:[]
       })
       try {
            await newroom.save()
            res.send('New Room Added Successfully')
       } catch (error) {
            return res.status(400).json({ error });
       }
  });

  router.delete("/removeroom/:roomId", async (req, res) => {
    const roomId = req.params.roomId;

    try {
        const room = await Room.findByIdAndDelete(roomId); 
        console.log("Room not found with ID:", roomId); // Add this log statement
        console.log("[DEBUG] Attempting to remove room with ID:", roomId); // Add a unique identifier

        if (!room) {
            console.log("[DEBUG] Room not found with ID:", roomId); // Add a unique identifier
            console.log("Room not found with ID:", roomId); // Add this log statement
            return res.status(404).json({ message: "Room not found" });
        }
        console.log("[DEBUG] Room removed successfully:", room); // Add a unique identifier
        console.log("Room removed successfully:", room); // Add this log statement
        res.send('Room removed successfully');
    } catch (error) {
        console.error("Error removing room:", error);
        return res.status(400).json({ message: error });
    }
});

module.exports = router;


