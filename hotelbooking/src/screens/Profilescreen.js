import React, { useEffect, useState } from "react";
import { Tabs, Tag } from "antd";
import axios from "axios";
import Swal from "sweetalert2";
import Error from "../components/Error";
import Loader from "../components/Loader";

const { TabPane } = Tabs;

function Profilescreen() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    setUser(userData);
    // If user is not logged in, redirect to login page
    if (!userData) {
      alert('Log in first');
      window.location.href = '/login'; // Redirect to login page
    }
  }, []);

  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  return (
    <div className="mt-5 ml-3">
      <Tabs defaultActiveKey="1">
      <TabPane tab={<span style={{ fontSize: '15px', fontWeight: 'bold' }}>My Profile</span>} key="1" >
          {user && (
            <div className="row">
              <div className="col-md-6 bs m-2 p-3">
                <h1>Name : {user.name}</h1>
                <h1>Email : {user.email}</h1>
                <h1>Admin Access : {user.isAdmin ? "Yes" : "No"}</h1>
                <div className='text-right'>
                  <button className='btn btn-primary' style={{  fontWeight:'bold' ,backgroundColor: 'blue'}}>Get Admin Access</button>
                </div>
              </div>
            </div>
          )}
        </TabPane>
        <TabPane tab={<span style={{ fontSize: '15px', fontWeight: 'bold' }}>Bookings</span>} key="2">
          <MyOrders user={user} />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Profilescreen;

export const MyOrders = ({ user }) => {
  const [mybookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await axios.post("/api/bookings/getuserbookings", {
          userid: user._id,
        });
        setMyBookings(response.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    if (user) {
      fetchBookings();
    }

    // Cleanup function
    return () => {
      // Perform cleanup if necessary
    };
  }, [user]);

  async function cancelBooking(bookingid, roomid) {
    try {
      setLoading(true);
      await axios.post('/api/bookings/cancelbooking', { bookingid, userid: user._id, roomid });
      setLoading(false);
      Swal.fire('Success', 'Your room has been cancelled successfully', 'success').then(result => {
        window.location.href = '/profile';
      });
    } catch (error) {
      Swal.fire('Error', 'Something went wrong', 'error').then(result => {
        window.location.href = '/profile';
      });
      setLoading(false);
    }
  }

  return (
    <div>
      {loading ? <Loader /> : error ? <Error /> : (
        mybookings.map(booking => (
          <div className="row" key={booking._id}>
            <div className="col-md-6 my-auto">
              <div className='bs m-1 p-2'>
                <h1>{booking.room}</h1>
                <p><b>BookingId : </b> {booking._id}</p>
                <p><b>Check In : </b>{booking.fromdate}</p>
                <p><b>Check Out : </b>{booking.todate}</p>
                <p><b>Status</b> : {booking.status === 'booked' ? (<Tag color="green">Confirmed</Tag>) : (<Tag color="red">Cancelled</Tag>)}</p>
                <div className='text-right'>
                  {booking.status === 'booked' && (
                    <button className='btn btn-primary' onClick={() => cancelBooking(booking._id, booking.roomid)} style={{  fontWeight:'bold' ,backgroundColor: 'blue'}} >Cancel Booking</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
