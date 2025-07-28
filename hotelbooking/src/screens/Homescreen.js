import React, { useState, useEffect } from "react";
import { DatePicker } from "antd";
import axios from "axios";
import Loader from "../components/Loader";
import Room from "../components/Room";
import moment from "moment";

const { RangePicker } = DatePicker;

function Homescreen() {
  const [hotels, setHotels] = useState([]);
  const [duplicateHotels, setDuplicateHotels] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [type, setType] = useState('all');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/rooms/getallrooms");
        const { rooms } = response.data;
        if (Array.isArray(rooms)) {
          setHotels(rooms);
          setDuplicateHotels(rooms);
        } else {
          console.error("Rooms data is not an array:", rooms);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setLoading(false);
      }
    };
    fetchRooms();

    // Set username from localStorage
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      setUsername(user.name);
    }
  }, []);

  const filterByDate = (dates) => {
    const fromDate = (dates[0]).format('DD-MM-YYYY');
    const toDate = (dates[1]).format('DD-MM-YYYY');
    setFromDate(fromDate);
    setToDate(toDate);
    const filteredHotels = duplicateHotels.filter(room => {
      for (const booking of room.currentbookings) {
        if (moment(fromDate).isBetween(booking.fromdate, booking.todate) ||
            moment(toDate).isBetween(booking.fromdate, booking.todate)) {
          return false;
        }
      }
      return true;
    });
    setHotels(filteredHotels);
  };

  const filterBySearch = () => {
    const filteredHotels = duplicateHotels.filter(room => room.name.toLowerCase().includes(searchKey.toLowerCase()));
    setHotels(filteredHotels);
  };

  function filterByType(e) {
    setType(e);
    if (e === 'all') {
      setHotels(duplicateHotels);
    } else {
      const filteredHotels = duplicateHotels.filter(room => room.type.toLowerCase() === e.toLowerCase());
      setHotels(filteredHotels);
    }
  }
  
  return (
    <div className="mt-5">
      <div >
        <div className="row">
          <div style={{ fontSize: '20px', fontWeight:'bold' ,color: 'blue', padding: '20px', textAlign:'center' }}>
            {username && <p className="mb-0" >Welcome, {username}!</p>}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row bs p-3 m-5" >
          <div className="col-md-4">
            <label className="mr-2">&nbsp;&nbsp;&nbsp;<b>Select Date:</b></label>
            <RangePicker
              style={{ height: "38px" }}
              onChange={filterByDate}
              format='DD-MM-YYYY'
              className='m-2'
            />
          </div>
          <div className="col-md-4">
          <label className="mr-2">&nbsp;&nbsp;&nbsp;<b>Search:</b></label>
            <input
              type="text"
              className="form-control i2 m-2"
              placeholder='search rooms'
              value={searchKey}
              onKeyUp={filterBySearch}
              onChange={(e) => setSearchKey(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="mr-2">&nbsp;&nbsp;&nbsp;<b>Select Type:</b></label>
            <select
              className="form-control m-2"
              value={type}
              onChange={(e) => filterByType(e.target.value)}
            >
              <option value="all">All</option>
              <option value="delux">Delux</option>
              <option value="non-delux">Non-Delux</option>
            </select>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        {loading ? (
          <Loader />
        ) : (
          hotels.map(room => (
            <div className="col-md-8" key={room.id} data-aos='zoom-in'>
              <Room room={room} fromdate={fromDate} todate={toDate} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Homescreen;

