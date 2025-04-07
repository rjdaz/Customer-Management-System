import React from 'react';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/userContext';

function AdminLogin({data}) {
  const { setUsername, setStat } = useContext(UserContext);
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
        const url = `${data}adminlogin`;
        const response = await axios.post(url, {
          username: adminUsername,
          password: adminPassword,
        });
          if (response.data.success) {
            localStorage.setItem('username', response.data.user);
            setStat(response.data.user);
            navigate('/');
            location.reload();
          } else {
            alert(response.data.error);
          }
      } catch (error) {
        console.error('Error in Admin Login:', error); // Debugging: Log the error
        alert('An error occurred while logging in. Please try again.');
      }
    };

  return (
    <section className='absolute w-full h-full flex flex-col justify-center items-center z-[1]'>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="username" 
          placeholder='Username' 
          value={adminUsername}
          onChange={(e) => setAdminUsername(e.target.value)}
          /><br />
        <input 
          type="password"
          name="password" 
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
          placeholder='Password'
          /> <br />
        <button type='submit'>Log In</button>
      </form>
    </section>
  );
}

export default AdminLogin;