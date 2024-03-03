import React, { useEffect, useState } from 'react';
import { Input, Button, Select } from 'antd';
import axios from 'axios';
import Loader from './Loader';
import Swal from 'sweetalert2';

const { Option } = Select;

function EditRoom({ roomId }) {
  const [loader, setLoader] = useState(false);
  const [roomDetails, setRoomDetails] = useState({
    name: '',
    rentperday: '',
    maxcount: '',
    description: '',
    conditioning: '',
    type: '',
    imageFile1: null,
    imageFile2: null,
    imageFile3: null,
    count: 0,
  });
  const [roomTypes, setRoomTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/api/rooms/getroombyid', {
          roomids: [roomId],
        });
        setRoomDetails(response.data[0]); // Update to response.data[0] since you're fetching details of a single room
        console.log('Room details response:', response.data[0]);

        

        const typesResponse = await axios.get('/api/types/getroomtypes');
        setRoomTypes(typesResponse.data);
        console.log('Room types response:', typesResponse.data);
      } catch (error) {
        console.error('Error fetching room details:', error);
      }
    };

    fetchData();
  }, [roomId]);

  const handleUpdateRoom = async () => {
    try {
      setLoader(true);

      // Assuming FormData is properly constructed
      const formData = new FormData();
      formData.append('name', roomDetails.name);
      formData.append('rentperday', roomDetails.rentperday);
      formData.append('maxcount', roomDetails.maxcount);
      formData.append('description', roomDetails.description);
      formData.append('conditioning', roomDetails.conditioning);
      formData.append('type', roomDetails.type);
      formData.append('count', roomDetails.count);
      

      // Append image files if necessary
      if (roomDetails.imageFile1) {
        formData.append('imagefile1', roomDetails.imageFile1);
      }

      if (roomDetails.imageFile2) {
        formData.append('imagefile2', roomDetails.imageFile2);
      }

      if (roomDetails.imageFile3) {
        formData.append('imagefile3', roomDetails.imageFile3);
      }



      const response = await axios.put(`/api/rooms/updateroom/${roomId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
      setLoader(false);
      Swal.fire({
        icon: 'success',
        title: 'Room Updated Successfully',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error(error);
      setLoader(false);
    }
  };

  const handleFileChange = (file, field) => {
    setRoomDetails({
      ...roomDetails,
      [`imageFile${field}`]: file,
    });
  };

  const handleInputChange = (e, key) => {
    const { value } = e.target;
    setRoomDetails(prevRoomDetails => ({
      ...prevRoomDetails,
      [key]: value,
    }));
  };
  

  return (
    <div>
      <h2>Edit Room</h2>
      <label>Room Name:</label>
      <Input
        placeholder='Room Name'
        value={roomDetails.name}
        onChange={(e) => handleInputChange(e, 'name')}
      />

      <label>Rent Per Day:</label>
      <Input
        placeholder='Rent Per Day'
        value={roomDetails.rentperday}
        onChange={(e) => handleInputChange(e, 'rentperday')}
      />

      <label>Maximum Occupancy:</label>
      <Input
        placeholder='Maximum Occupancy'
        value={roomDetails.maxcount}
        onChange={(e) => handleInputChange(e, 'maxcount')}
      />

      <label>Description:</label>
      <Input.TextArea
        placeholder='Description'
        value={roomDetails.description}
        onChange={(e) => handleInputChange(e, 'description')}
      />

      <label>Conditioning:</label>
      <Select
        placeholder='Select Conditioning'
        value={roomDetails.conditioning}
        onChange={(value) => handleInputChange({ target: { value } }, 'conditioning')}
      >
        <Option value='AC'>AC</Option>
        <Option value='NonAC'>Non-AC</Option>
      </Select>

      <label>Room Type:</label>
      <Select
        placeholder='Select Room Type'
        value={roomDetails.type}
        onChange={(value) => handleInputChange({ target: { value } }, 'type')}
      >
        {roomTypes.map((type) => (
          <Option key={type._id} value={type.type}>
            {type.type}
          </Option>
        ))}
      </Select>

      <label>Available:</label>
      <Input
        placeholder='Available'
        value={roomDetails.count}
        onChange={(e) => handleInputChange(e, 'count')}
      />

      {[1, 2, 3].map((index) => (
        <div key={index}>
          <label>{`Image File ${index}:`}</label>
          <input
            type='file'
            onChange={(e) => handleFileChange(e.target.files[0], index)}
          />
        </div>
      ))}

      <Button type='primary' className='mt-3' onClick={handleUpdateRoom}>
        Update Room
      </Button>
      {loader && <Loader />}
    </div>
  );
}

export default EditRoom;
