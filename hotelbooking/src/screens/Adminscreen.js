import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Error from "../components/Error";
import Loader from "../components/Loader";

const { TabPane } = Tabs;
const user = JSON.parse(localStorage.getItem("currentUser"));

function Adminscreen() {

  useEffect(() => {

    if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
      window.location.href = '/home'
    }
  }, [])


  return (
    <div className="ml-3">
      <h2 className="text-center m-2" style={{ fontSize: "35px" }}>
        Admin Panel
      </h2>
      <Tabs defaultActiveKey="1">
        <TabPane tab={<span style={{ fontSize: '15px', fontWeight: 'bold' }}>Bookings</span>} key="1">
          <div className="row">
            <Bookings />
          </div>
        </TabPane>
        <TabPane tab={<span style={{ fontSize: '15px', fontWeight: 'bold' }}>Rooms</span>} key="2">
          <div className="row">
            <Rooms />
          </div>
        </TabPane>
        <TabPane tab={<span style={{ fontSize: '15px', fontWeight: 'bold' }}>Add Room</span>} key="3">
          <Addroom />
        </TabPane>
        <TabPane tab={<span style={{ fontSize: '15px', fontWeight: 'bold' }}>Users</span>} key="4">
          <Users />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Adminscreen;

export function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/bookings/getallbookings");
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    fetchBookings();

    return () => {
      // Cleanup function (if necessary)
    };
  }, []);

  return (
    <div className="col-md-11">
      <h1>Bookings</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        <div>
          <table className="table table-bordered table-dark">
            <thead className="bs">
              <tr>
                <th>Booking Id</th>
                <th>Userid</th>
                <th>Room</th>
                <th>From</th>
                <th>To</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking._id}</td>
                  <td>{booking.userid}</td>
                  <td>{booking.room}</td>
                  <td>{booking.fromdate}</td>
                  <td>{booking.todate}</td>
                  <td>{booking.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/rooms/getallrooms");
        console.log("Response data type:", typeof response.data);
        setRooms(response.data.rooms); // Accessing rooms array within the response object
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    fetchRooms();

    return () => {
      // Cleanup function (if necessary)
    };
  }, []);

  return (
    <div className="col-md-11">
      <h1>Rooms</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        <div>
          <table className="table table-bordered table-dark">
            <thead className="bs">
              <tr>
                <th>Room Id</th>
                <th>Name</th>
                <th>Type</th>
                <th>Rent Per day</th>
                <th>Max Count</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room._id}>
                  <td>{room._id}</td>
                  <td>{room.name}</td>
                  <td>{room.type}</td>
                  <td>{room.rentperday}</td>
                  <td>{room.maxcount}</td>
                  <td>{room.phonenumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}




export function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users/getallusers');
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchUsers();

    return () => {
      // Cleanup function (if necessary)
    };
  }, []);

  return (
    <div className="row">
      {loading ? (
        <Loader />
      ) : (
        <div className="col-md-10">
          <table className="table table-bordered table-dark">
            <thead className="bs">
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>isAdmin</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}


export function Addroom() {
  const [room, setRoom] = useState("");
  const [rentPerDay, setRentPerDay] = useState("");
  const [maxCount, setMaxCount] = useState("");
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [type, setType] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [roomIdToRemove, setRoomIdToRemove] = useState("");

  const addRoom = async () => {
    // Check if any input field is empty
    if (
      !room ||
      !rentPerDay ||
      !maxCount ||
      !description ||
      !phoneNumber ||
      !type ||
      !image1 ||
      !image2 ||
      !image3
    ) {
      console.error("All fields are required");
      return;
    }

    // Check if phoneNumber has exactly 10 numbers
    if (!/^\d{10}$/.test(phoneNumber)) {
      console.error("Phone number must be 10 digits long");
      return;
    }

    // Check if type is either "Delux" or "Non-Delux"
    if (type !== "Delux" && type !== "Non-Delux") {
      console.error("Type must be either 'Delux' or 'Non-Delux'");
      return;
    }

    const roomObj = {
      room,
      rentperday: rentPerDay,
      maxcount: maxCount,
      description,
      phonenumber: phoneNumber,
      type,
      image1,
      image2,
      image3
    };

    try {
      const result = await axios.post("/api/rooms/addroom", roomObj);
      console.log("Room added successfully");
      window.alert("Room added successfully");
      // Optionally, you can reset the input fields after successful addition
      setRoom("");
      setRentPerDay("");
      setMaxCount("");
      setDescription("");
      setPhoneNumber("");
      setType("");
      setImage1("");
      setImage2("");
      setImage3("");
    } catch (error) {
      console.error("Error adding room:", error);
    }

  };


  const removeRoom = async (roomId) => {
    console.log("Removing room with ID:", roomId);
    try {
      await axios.delete(`/api/rooms/removeroom/${roomId}`);
      console.log("Room removed successfully");
      window.alert("Room removed successfully");
      // Optionally, you can update the state or perform any other action after removing the room
    } catch (error) {
      console.error("Error removing room:", error);
      window.alert("Error removing room");
    }
  };

  return (

    <div>
    <div className="row">
      <div className="col-md-5">
        <input
          type="text"
          className="form-control mt-1"
          placeholder="Name"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <input
          type="text"
          className="form-control mt-1"
          placeholder="Rent Per Day"
          value={rentPerDay}
          onChange={(e) => setRentPerDay(e.target.value)}
        />
        <input
          type="text"
          className="form-control mt-1"
          placeholder="Max Count"
          value={maxCount}
          onChange={(e) => setMaxCount(e.target.value)}
        />
        <input
          type="text"
          className="form-control mt-1"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          className="form-control mt-1"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <div className="col-md-6">
        <input
          type="text"
          className="form-control mt-1"
          placeholder="Type (Delux/Non-Delux)"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <input
          type="text"
          className="form-control mt-1"
          placeholder="Image URL 1"
          value={image1}
          onChange={(e) => setImage1(e.target.value)}
        />
        <input
          type="text"
          className="form-control mt-1"
          placeholder="Image URL 2"
          value={image2}
          onChange={(e) => setImage2(e.target.value)}
        />
        <input
          type="text"
          className="form-control mt-1"
          placeholder="Image URL 3"
          value={image3}
          onChange={(e) => setImage3(e.target.value)}
        />
        <div className="mt-1 text-right">
          <button className="btn btn-primary" onClick={addRoom} style={{  fontWeight:'bold' ,backgroundColor: 'blue'}} >
            ADD ROOM
          </button>
        </div>
      </div>

    </div>
    <div className="col-md-5" style={{marginTop:'50px',paddingLeft:'0px'}} >
        <div className="mt-3 ">
          <h4 style={{fontWeight:'bold'}} >Remove Room</h4>
          <div className="form-group">
            <label htmlFor="roomIdToRemove">Room ID to Remove:</label>
            <input
              type="text"
              className="form-control"
              id="roomIdToRemove"
              value={roomIdToRemove}
              onChange={(e) => setRoomIdToRemove(e.target.value)} 
            />
          </div>
          <button
            className="btn btn-danger"
            onClick={() => removeRoom(roomIdToRemove)} 
            style={{ fontWeight: "bold" }}
          >
            REMOVE ROOM
          </button>
        </div>
      </div>
    </div>







  )
}


