import React, { useState } from 'react';
import Loader from '../Components/Loader';
import myImage from "../Assets/1.jpg"


function AboutHotel() {
  const [loading, setLoading] = useState(true); // Add loading state for the component

  const handleImageLoad = () => {
    setLoading(false); // Set loading to false when the image is loaded
  };

  return (
    <div>
      <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', textAlign: 'center', margin: '20px auto' }} className="heading">
        <h1 style={{ fontSize: '50px', color: '#000', marginBottom: '25px', position: 'relative' }}>Our Hotel</h1>
        <p style={{ fontSize: '18px', lineHeight: '1.5', color: '#666', textAlign: 'justify' }}>Experience the ultimate in hospitality at our luxurious hotel, where every detail is meticulously designed to provide you with comfort and relaxation. Nestled in the heart of the city, our hotel offers breathtaking views and world-class amenities to make your stay unforgettable.</p>
      </div>
      <div style={{ width: '90%', margin: '0 auto', padding: '10px 20px' }} className="container">
        <section style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }} className="about">
          <div style={{ flex: 1, marginRight: '40px', overflow: 'hidden', position: 'relative' }} className="about-cofee">
            {loading && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#f2f2f2',
                }}
              >
                <span><Loader/></span>
              </div>
            )}
            <img
              src={myImage}
              alt="hotel view"
              style={{ maxWidth: '100%', height: 'auto', transition: '0.5s ease' }}
              onLoad={handleImageLoad}
            />
          </div>
          <div style={{ flex: 1 }} className="about-content">
            <h2 style={{ fontSize: '23px', marginBottom: '15px', color: '#333' }}>Luxury at its Finest</h2>
            <p style={{ fontSize: '18px', lineHeight: '1.5', color: '#666', textAlign: 'justify' }}>Our hotel offers a range of luxurious amenities, including spacious rooms, fine dining restaurants, state-of-the-art fitness facilities, and relaxing spa treatments. Whether you're traveling for business or leisure, our attentive staff is dedicated to ensuring your every need is met with personalized service and hospitality.</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AboutHotel;
