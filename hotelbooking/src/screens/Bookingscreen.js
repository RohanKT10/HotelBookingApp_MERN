import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams hook
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";
import moment from "moment";
import StripeCheckout from 'react-stripe-checkout'
import Swal from 'sweetalert2'

function Bookingscreen() {
    const { roomid ,fromdate,todate} = useParams(); // Use useParams hook to get route parameters
    //const { roomid, fromdate, todate } = props.match.params; // Extract roomid, fromdate, and todate from props.match.params
    console.log("Room ID:", roomid);
    console.log("From Date:", fromdate);
    console.log("To Date:", todate);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [room, setRoom] = useState(null); // Initialize room state with null

    const checkin = moment(fromdate, 'DD-MM-YYYY');
    const checkout = moment(todate, 'DD-MM-YYYY');
    const totalDays = checkout.diff(checkin, 'days') + 1;
    const totalamount = room ? totalDays * room.rentperday : 0;

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        // If user is logged in, redirect to home page
        if (!user) {
          alert('Log in first');
          window.location.href = '/login'; // Redirect to home page
        }
      }, []);
    
      const [pageLoaded, setPageLoaded] = useState(false);
    
      useEffect(() => {
        setPageLoaded(true);
      }, []);
    
    
    
    useEffect(() => {
        const fetchRoomById = async () => {
            try {
                setLoading(true);
                const { data } = await axios.post("/api/rooms/getroombyid", { roomid }); // Use roomid obtained from useParams
                setRoom(data.room); // Assuming 'room' is the property containing the room data
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(true);
                console.error('Error fetching room:', error);
            }
        };
    
        fetchRoomById();
    }, [roomid]); // Include roomid in dependency array

// Add this part to print room details
useEffect(() => {
    console.log('Room details:', room);
    if (room) {
        console.log('Max Count:', room.name);
        console.log('Rent Per Day:', room.rentperday);
    }
}, [room]);

async function bookRoom() {

    const userid = JSON.parse(localStorage.getItem('currentUser'))._id;
    const bookingdetails = {
        room,
        userid,
        fromdate,
        todate,
        totalamount,
        totalDays,
    
    };
    console.log('Booking Details:', bookingdetails);
    try {
        setLoading(true)
        const result = await axios.post('/api/bookings/bookroom', bookingdetails);
        setLoading(false)
        Swal.fire('Congrats' , 'Your Room has booked succeessfully' , 'success').then(result=>{
            window.location.href='/profile'})
    } catch (error) {
       
        console.error('Error booking room:', error);
        // Handle other errors, such as network errors
        setLoading(false)
        Swal.fire('Oops' , 'Something went wrong , please try later' , 'error')
    }
}


 /*   function tokenHandler(token) {

        console.log('value of token:',token);
    }*/
    async function onToken(token) {
        try {
            // Call bookRoom function with token data and other necessary information
            await bookRoom(token);
            console.log('value of token:',token.email);
        } catch (error) {
            // Handle any errors that occur during booking process
            console.error('Error booking room:', error);
            // Optionally, you can display an error message to the user
        }
    }


   
    return (
        <div className="m-5">
            {loading ? (
                <h1><Loader /></h1>
            ) : error ? (
                <h1><Error /></h1>
            ) : room ? ( // Check if room exists before rendering its details
                <div className="row justify-content-center mt-5 bs">
                    <div className="col-md-6">
                        <h1>{room.name}</h1>
                        <img src={room.imageurls?.[0]} className="bigimg" />
                    </div>
                    <div className="col-md-5">
                        <div style={{ textAlign: 'right' }}>
                            <h1 style={{ fontSize: '30px', fontWeight:'bold' ,color: 'blue' }}>Booking Details</h1>
                            <hr style={{ borderTop: '3px solid black' }} />
   
                            <b>
                                <p>Name : {JSON.parse(localStorage.getItem('currentUser')).name}</p>
                                <p>Check-in :{fromdate}</p>
                                <p>Check-out:{todate}</p>
                                <p>Max Count:{room.maxcount}</p>
                            </b>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                            <h1 style={{ fontSize: '30px', fontWeight:'bold' ,color: 'blue' }}>Amount</h1>
                            <hr style={{ borderTop: '3px solid black'}} />
                           
                            <b>
                                <p>Total days:{totalDays}</p>
                                <p>Rent per day:{room.rentperday}</p>
                                <p>Total Amount:{totalamount}</p>
                            </b>

                            
                        </div>

                        <StripeCheckout
                            amount={totalamount * 100}
                            shippingAddress
                            //token={tokenHandler}
                            token={(token) => onToken(token)} // Pass token to tokenHandler function
                            stripeKey='pk_test_51OjKmESIRG6nKvL0TEcCvL4myQsdfC92QIszL2tFWnUCcm11Agnlseb6pYAwXqmr26v0kgVvxxGIhwYGYYMsWbCa00bxoZFr1P'
                            currency='INR'
                        >

                            <div style={{ float: 'right' }}>
                                <button className='btn btn-primary' style={{  fontWeight:'bold' ,backgroundColor: 'blue'}} >Pay Now</button>
                            </div>
                            
                        </StripeCheckout>
                    </div>




                </div>

            ) : (
                <h1>Room not found</h1>
            )
            }
        </div >
    );
}

export default Bookingscreen;