import React, { useState } from 'react';
import axios from 'axios';
import Loader from '../Components/Loader';
import Success from '../Components/Success';
import Error from '../Components/Error';

function Regscreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function register() {
    if (password === cpassword) {
      const user = {
        name,
        email,
        password,
        cpassword,
      };
      try {
        setLoading(true);
        await axios.post('/api/admin/admin', user);
        setLoading(false);
        setSuccess(true);
        setError(''); // Reset the error state when registration is successful
  
        setName('');
        setEmail('');
        setPassword('');
        setCpassword('');
      } catch (error) {
        setLoading(false);
        if (error.response && error.response.status === 400 && error.response.data.error === "Email already exists") {
          setError("User with this email is already registered");
        } else {
          setError("An error occurred. Please try again later.");
        }
        console.log(error);
      }
    } else {
      alert('Passwords do not Match');
    }
  }
  

  return (
    <div>
      {loading && <Loader />}
      {error && <Error message={error} />} {/* Display error message */}
      
      <div className="row justify-content-center mt-5">
      
        <div className="col-md-5 mt-5 ">
          {success && <Success message="Registered successfully" />}
          <div className="bs">
            <h2>Register</h2>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Name"
            />
            <input
              type="text"
              className="form-control"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
            />
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
            />
            <input
              type="password"
              className="form-control"
              value={cpassword}
              onChange={(e) => {
                setCpassword(e.target.value);
              }}
              placeholder="Confirm Password"
            />
            <button className="btn btn-primary mt-3" onClick={register}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Regscreen;
