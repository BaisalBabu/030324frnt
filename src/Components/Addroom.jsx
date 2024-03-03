import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Loader from '../Components/Loader';
import { Input } from 'antd';

function Addroom() {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [name, setName] = useState('');
  const [rentPerDay, setRentPerDay] = useState('');
  const [maxCount, setMaxCount] = useState('');
  const [description, setDescription] = useState('');
  const [conditioning, setConditioning] = useState('NonAC');
  const [selectedType, setSelectedType] = useState('');
  const [imageFile1, setImageFile1] = useState(null);
  const [imageFile2, setImageFile2] = useState(null);
  const [imageFile3, setImageFile3] = useState(null);
  const [count, setCount] = useState(0);
  const [roomTypes, setRoomTypes] = useState([]);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const response = await axios.get('/api/types/getroomtypes');
        setRoomTypes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRoomTypes();
  }, []);

  async function addRoom() {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('rentperday', rentPerDay);
    formData.append('maxcount', maxCount);
    formData.append('description', description);
    formData.append('conditioning', conditioning);
    formData.append('type', selectedType);
    formData.append('count', count);

    if (imageFile1) {
      formData.append('imagefile1', imageFile1);
    }

    if (imageFile2) {
      formData.append('imagefile2', imageFile2);
    }

    if (imageFile3) {
      formData.append('imagefile3', imageFile3);
    }

    try {
      setLoader(true);

      const result = await axios.post('/api/rooms/addroom', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(result.data);

      Swal.fire('Congrats', 'New Room Added Successfully', 'success').then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error(error);

      setLoader(false);
      setError(true);

      Swal.fire('Oops', 'Something Went Wrong', 'error');
    }
  }

  return (
    <div className='row'>
      {loader && <Loader />}
      <div className='col-md-5'>
        <div>
          <label htmlFor='name'>Room Name:</label>
          <input
            type='text'
            className='form-control'
            
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='rentPerDay'>Rent Per Day:</label>
          <input
            type='text'
            className='form-control'
            
            value={rentPerDay}
            onChange={(e) => setRentPerDay(e.target.value)}
          />
        </div>
        <div>
          <label>Maximum Occupancy:</label>
          <input
            type='text'
            className='form-control'
            
            value={maxCount}
            onChange={(e) => setMaxCount(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='description'>Description:</label>
          <Input.TextArea
            type='text'
            className='form-control'
            
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='conditioning'>Conditioning:</label>
          <select
            id='conditioning'
            className='form-control'
            value={conditioning}
            onChange={(e) => setConditioning(e.target.value)}
          >
            <option value='NonAC'>Non-AC</option>
            <option value='AC'>AC</option>
          </select>
        </div>
        <div>
          <label htmlFor='type'>Room Type:</label>
          <select
            id='type'
            className='form-control'
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value='' disabled>
              Select Room Type
            </option>
            {roomTypes
              .filter((type) => type.display !== false)
              .map((type) => (
                <option key={type._id} value={type.type}>
                  {type.type}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className='col-md-5'>
        <div>
          <label htmlFor='imagefile1'>Image File 1:</label>
          <input
            type='file'
            className='form-control'
            onChange={(e) => setImageFile1(e.target.files[0])}
          />
        </div>
        <div>
          <label htmlFor='imagefile2'>Image File 2:</label>
          <input
            type='file'
            className='form-control'
            onChange={(e) => setImageFile2(e.target.files[0])}
          />
        </div>
        <div>
          <label htmlFor='imagefile3'>Image File 3:</label>
          <input
            type='file'
            className='form-control'
            onChange={(e) => setImageFile3(e.target.files[0])}
          />
        </div>
        <div>
          <label htmlFor='Floor No'>Floor no:</label>
          <input
            type='number'
            className='form-control'
            
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
        </div>
        <div className='text-right'>
          <button className='btn btn-primary mt-2' onClick={addRoom} disabled={loader}>
            {loader ? 'Adding...' : 'Add '}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Addroom;
