import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Components/Loader';
import Error from '../Components/Error';
import moment from 'moment';
import Swal from 'sweetalert2';

const Bookingscreen = () => {
  const { roomid, fromdate, todate, numberOfPeople } = useParams(); // Remove numberOfPeople as it's not provided in the URL
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [room, setRoom] = useState();
  const [totalamount, setTotalamount] = useState();
  const [imageUrl, setImageUrl] = useState('');
  const [guestCount, setGuestCount] = useState(1); // Initialize guestCount with 1 by default

  const totaldays = moment(todate, 'DD-MM-YYYY').diff(moment(fromdate, 'DD-MM-YYYY'), 'days');
  const totldys = totaldays + 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.post('/api/rooms/getroombyid', { roomids: [roomid] });
        setTotalamount(response.data[0].rentperday * totldys);
        setRoom(response.data[0]);
        setLoading(false);

        // Convert base64 encoded image data to data URL
        if (response.data[0].imagefile1) {
          const imageData = response.data[0].imagefile1;
          const imageUrl = `data:${imageData.contentType};base64,${imageData.data}`;
          setImageUrl(imageUrl);
        }
      } catch (error) {
        setError(true);
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [roomid]);

  async function handleBooking() {
    const currentuser = JSON.parse(localStorage.getItem('currentuser'));
    const bookingDetails = {
      room,
      userid: currentuser._id,
      username: currentuser.name, // Include username in the booking details
      fromdate,
      todate,
      totalamount,
      totaldays: totldys,
      guestCount: numberOfPeople // Include guestCount in the booking details
    };

    try {
      setLoading(true);
      const result = await axios.post('/api/bookings/bookroom', bookingDetails);
      setLoading(false);
      Swal.fire("Congratulations", "Your Room has Been Booked Successfully", "success").then(result => {
        window.location.href = '/profile';
      });
    } catch (error) {
      setLoading(false);
      Swal.fire('Oops', "Something went wrong", "error");
    }
  }

  return (
    <div className='m-5'>
      {loading ? (
        <h1 className='text-center'><Loader /></h1>
      ) : error ? (
        <Error />
      ) : (
        <div>
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-4">
              <div className="text-left">
                <h1>{room.name}</h1>
                {imageUrl && (
                  <img
                    src={imageUrl}
                    className='bigimg'
                    alt="Room Preview"
                  />
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div style={{ textAlign: 'right' }}>
                <b>
                  <h1>Booking Details</h1>
                  <hr />
                  <p>Name: {JSON.parse(localStorage.getItem('currentuser')).name}</p>
                  <p>From: {fromdate}</p>
                  <p>To: {todate}</p>
                  <p>Guest Count: {numberOfPeople}</p> {/* Display guestCount */}
                  <h1>Amount:</h1>
                  <hr />
                  <p>Total days: {totldys}</p>
                  <p>Rent per day: {room.rentperday}</p>
                  <p>Total Amount: {totalamount}</p>
                </b>
              </div>
              <div style={{ float: 'right' }}>
                <button className='btn btn-primary' onClick={handleBooking}>Book Now</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookingscreen;
