import React ,{useState,useEffect}from "react";
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation

const LandingScreen = () => {
  
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


    return (
    <div className="landing-screen">
      <header className="header" >
     
        <h4 style={{fontWeight:'bold' ,color: 'blue'}}>Find your next stay in Kolkata</h4>
        <h4 style={{fontWeight:'bold' ,color: 'blue'}} >Get best deals on hotels like...</h4>
        
      </header>
      <div className="container"   >
        <div className="row">
          <div className="col-md-4">
            <div className="hotel-box" >
              <img src="https://cf.bstatic.com/xdata/images/hotel/square600/32092064.webp?k=3fab7f8e639cfd5a6901c173cd6af37684795934cd4e7ed653686f5c2ab81b96&o=" alt="Hotel 1" className="img-fluid" />
              <h3 style={{ color:'blue', fontWeight:'bold'  }} >The Oberoi Grand</h3>
            </div>
          </div>
          <div className="col-md-4" >
            <div className="hotel-box">
              <img src="https://cf.bstatic.com/xdata/images/hotel/square600/175820149.webp?k=af17ca24d3c020313a23dab4ef31be4f5d46ebdeb52d0fe07ae62952fb544c90&o=" alt="Hotel 2" className="img-fluid" />
              <h3 style={{ color:'blue', fontWeight:'bold'  }} >Ibis Kolkata</h3>
            </div>
          </div>
          <div className="col-md-4">
            <div className="hotel-box">
              <img src="https://cf.bstatic.com/xdata/images/hotel/square600/463617226.webp?k=dfa2ad9bb8394ac679ef9a1281c85e45c1a0106e3a327a378ca80a0619c0b45a&o=" alt="Hotel 3" className="img-fluid" />
              <h3 style={{ color:'blue', fontWeight:'bold'  }} >ITC Royal Bengal</h3>
            </div>
          </div>
        </div>
      </div>
      <p className='font-weight-bold' style={{fontWeight:'bold' ,color: 'white'}}><h1>and much more.....register now</h1></p>
        <Link to="/register" className="get-started-btn" style={{ fontSize: '17px', fontWeight:'bold' ,backgroundColor:'blue' }} >Get Started</Link>
    </div>
                      
            
  );
};

export default LandingScreen;
