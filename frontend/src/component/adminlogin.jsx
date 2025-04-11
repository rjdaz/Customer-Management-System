import React from 'react';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/userContext';

function AdminLogin({data, isAdmin, setIsAdminCode, setIsAdmin, setIsCustomer}) {
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
    <section className={`absolute w-full h-full flex flex-col justify-center items-center ${isAdmin ? 'block' : 'hidden'}`}>
      <form onSubmit={handleSubmit} className='w-[70%] h-full bg-red-100 flex flex-col justify-start items-center'>
        <input 
          type="text" 
          name="username" 
          placeholder='Username' 
          value={adminUsername}
          onChange={(e) => setAdminUsername(e.target.value)}
          className='border w-[80%] p-2 mt-[30%]'
          /><br />
        <input 
          type="password"
          name="password" 
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
          placeholder='Password'
          className='border w-[80%] p-2'
          /> <br />
        <button 
          type='submit'
          className='bg-amber-500 w-[80%] p-2 flex justify-center items-center mt-2'
        >Log In</button>
      </form>
    </section>
  );
}

export default AdminLogin;