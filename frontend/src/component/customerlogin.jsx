import React from 'react';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/userContext';

function CustomerLogin({data}) {
  const { setUsername, setStat } = useContext(UserContext);
  const [customerUsername, setCustomerUsername] = useState('');
  const [customerPassword, setCustomerPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmitCustomer = async (e) => {
    e.preventDefault();
      try {
        const url = `${data}customerlogin`; // Construct the full URL
        console.log('Customer Login URL:', url); // Debugging: Log the URL
        const response = await axios.post(url, {
          username: customerUsername,
          password: customerPassword,
        });

        if (response.data.success) {
          localStorage.setItem('username', response.data.user);
          setUsername(response.data.user);
          navigate('/');
          location.reload();
        } else {
          alert(response.data.error);
        }
      } catch (error) {
        console.error('Error in Customer Login:', error); // Debugging: Log the error
        alert('An error occurred while logging in. Please try again.');
      }
  };

  return (
    <section className='absolute w-full h-full flex flex-col justify-center items-center '> 
      <form onSubmit={handleSubmitCustomer} className='w-full bg-yellow-300 flex flex-col justify-center items-center z-[-1] h-[70%]'>
        <input
          type="text" 
          name="username" 
          placeholder='Username' 
          value={customerUsername}
          onChange={(e) => setCustomerUsername(e.target.value)}
          className='w-[50%] p-2'
          /><br />
        <input 
          type="password"
          name="password" 
          value={customerPassword}
          onChange={(e) => setCustomerPassword(e.target.value)}
          placeholder='Password'
          className='w-[50%] p-2'
          /> <br />
        <button type='submit' className='w-[50%] border'>Log In</button>
      </form>
      <div className='w-full h-[20%]'>
      <a href="">CREATE NEW ACCOUNT</a>
      </div>
      <div className='w-full h-[10%]'>
        <a href="">help?</a>
        <a href="">Forgot Password?</a>
      </div>
    </section>
  );
}

export default CustomerLogin;