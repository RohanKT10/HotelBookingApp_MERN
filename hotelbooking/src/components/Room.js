import React ,{useState} from "react";
import { Modal,Button,Carousel } from "react-bootstrap";
import{Link} from 'react-router-dom'


function Room({ room , fromdate, todate }) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="row bs"  >
            <div className="col-md-4" style={{}} >
                <img src={room.imageurls[0]} className="smallimg"  style={{border:'solid blue',borderWidth:'0.5px'}} />
            </div>
            <div className="col-md-7" >
                <h1><b>{room.name}</b></h1>
                <hr style={{ borderTop: '2px solid blue'}} />
                <b>
                    <p>Rent Per Day: {room.rentperday}</p>
                   
                    <p>Phone Number: {room.phonenumber}</p> 
                    <p>Type: {room.type}</p>
                    <p>Max Count : {room.maxcount}</p>
                  
                </b>
                <div style={{ float: "right" }}>

                  {(fromdate && todate)&&(
                    
                    <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
                    <Button className="btn-btn-primary m-2" style={{  fontWeight:'bold' ,backgroundColor: 'blue'}} >Book Now</Button>
                    </Link>
                  )}

                 
                    <button className="btn btn-primary" onClick={handleShow}style={{  fontWeight:'bold' ,backgroundColor: 'blue'}} >View Details</button>
                </div>
            </div>
      

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Carousel prevLabel='' nextLabel=''>
            {room.imageurls.map(url=>{
              return <Carousel.Item>
             
              <img
                  className="d-block w-100 bigimg"
                  src={url}
              />
          </Carousel.Item>
            })}

        </Carousel>
        <p>{room.description}</p>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        
        </Modal.Footer>
      </Modal>
        </div>
    );
}
export default Room;