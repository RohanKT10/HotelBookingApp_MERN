import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Error from '../components/Error';
import Loader from '../components/Loader';

function Loginscreen() {
  const [user] = useState(JSON.parse(localStorage.getItem('currentUser')));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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

  const login = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/login', { email, password });
      const result = response.data;
      if (result) {
        localStorage.setItem('currentUser', JSON.stringify(result));
        window.location.href = '/home';
      } else {
        setError(true);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className='login-screen'>
      {loading && <Loader />}
      {error && <Error message={error} />}

      <div className="row justify-content-center mt-5" >
        <div className="col-md-5">
          <div className="bs" style={{backgroundColor:'white'}}>
            <h2 style={{ fontSize: '30px', fontWeight:'bold' ,color: 'blue',textAlign:'center' }} >Login</h2>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
           <button className="btn btn-primary mt-3" onClick={login} style={{  fontWeight:'bold' ,backgroundColor: 'blue'}} >Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginscreen;
