import React from "react";

function Navbar() {
  const user = JSON.parse(localStorage.getItem('currentUser'));

  function logout(){
    localStorage.removeItem('currentUser');
    window.location.href="/login";
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" style={{ fontSize: '23px', fontWeight:'bold' ,color: 'white' }} href="#">BookEasy</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-12">
            {user ? (
              <>
                <div className="dropdown" >
                  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{backgroundColor:'blue'}} >
                  <span>  <i className="fa fa-user mr-2" ></i> {user.name} </span>
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a className="dropdown-item" href="/profile">Profile</a></li>
                    {user.isAdmin && <li><a className="dropdown-item" href="/admin">Admin</a></li>}
                    <li><a className="dropdown-item" href="#" onClick={logout}>Logout</a></li>
                    <li><a className="dropdown-item" href="/home">Home</a></li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/register" style={{ fontSize:'18px'  }}>Register</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/login" style={{ fontSize:'18px'  }}>Login</a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
