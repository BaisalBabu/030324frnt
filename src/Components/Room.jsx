import React, { useState, useEffect } from 'react';
import { Button, Carousel, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Room({ room, fromdate, todate ,numberOfPeople}) {
  const [show, setShow] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    // Convert base64 encoded image data to data URLs
    const urls = [
      room.imagefile1,
      room.imagefile2,
      room.imagefile3
    ].map(imageData => {
      if (imageData) {
        return `data:${imageData.contentType};base64,${imageData.data}`;
      } else {
        return null;
      }
    });
    setImageUrls(urls);
  
    // Log the generated image URLs
    console.log("Generated Image URLs:", urls);
  
  }, [room.imagefile1, room.imagefile2, room.imagefile3]);
  

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const renderImages = () => {
    return imageUrls.map((imageUrl, index) => (
      <Carousel.Item key={index}>
        {imageUrl && (
          <img
            className="d-block w-100 bigimg"
            src={imageUrl}
            alt={`Room Image ${index + 1}`}
          />
        )}
      </Carousel.Item>
    ));
  };

  return (
    <div className='row bs'>
      <div className="col-md-4">
        {imageUrls[0] && (
          <img
            src={imageUrls[0]}
            className='smallimg'
            alt="Room Preview"
            onClick={() => setSelectedImageIndex(0)}
          />
        )}
      </div>
      <div className="col-md-7 text-left">
        <h1>{room.name}</h1>
        <b>
          <p>Maximum Occupancy: {room.maxcount}</p>
          <p>Conditioning: {room.conditioning}</p>
          <p>Type: {room.type}</p>
          <p>Floor no: {room.count}</p>
        </b>
        <div style={{ float: 'right' }}>
        {(fromdate && todate) && (
            <Link to={`/book/${room._id}/${fromdate}/${todate}/${numberOfPeople}`}>
              <Button className='btn btn-primary m-2'>Book Now</Button>
            </Link>
          )}
          <Button className='btn btn-primary' onClick={handleShow}>View Details</Button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel
            prevLabel=''
            nextLabel=''
            activeIndex={selectedImageIndex}
            onSelect={(index) => setSelectedImageIndex(index)}
          >
            {renderImages()}
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
