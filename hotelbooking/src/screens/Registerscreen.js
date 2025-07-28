import React, { useState, useEffect } from "react";
import axios from "axios";
import Error from "../components/Error";
import Success from "../components/Success";
import Loader from "../components/Loader";

function Registerscreen() {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [cpassword, setcpassword] = useState('');
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
  const [success, setsuccess] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    // If user is logged in, redirect to home page
    if (user) {
      alert('Log out first');
      window.location.href = '/home'; // Redirect to home page
    }
  }, []);

  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  async function register() {
    if (password === cpassword) {
        const user = {
            name,
            email,
            password,
            cpassword
        };
        try {
            setloading(true);
            // Check if user with the same email already exists
            const existingUserResponse = await axios.get(`/api/users/${email}`);
            const existingUser = existingUserResponse.data;
            
            if (existingUser.exists) {
                setloading(false);
                seterror('User with this email already exists');
                return; // Stop further execution
            }
            
            // Proceed with registration if user doesn't exist
            const result = await axios.post('/api/users/register', user).data;
            setloading(false);
            setsuccess(true);
            setname('');
            setemail('');
            setpassword('');
            setcpassword('');
        } catch (error) {
            console.error("Error registering user:", error);
            setloading(false);
            seterror('An error occurred while registering');
        }
    } else {
        alert("Passwords not match");
    }
}



  return (
    <div className="register-screen">
      {loading && <Loader />}
      {error && <Error message={error} />}
      

      <div className="row justify-content-center mt-5">
        <div className="col-md-5">
        {success && (<Success message='Registration Successfull'/>)}
          <div className="bs" style={{backgroundColor:'white'}}>
            <h2 style={{ fontSize: '30px', fontWeight:'bold' ,color: 'blue',textAlign:'center' }} >Register</h2>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              value={cpassword}
              onChange={(e) => setcpassword(e.target.value)}
            />
            <button className="btn btn-primary mt-3 mx-auto" onClick={register} style={{  fontWeight:'bold' ,backgroundColor: 'blue'}} >Register</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registerscreen;

