import React from 'react';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/userContext';

function CustomerLogin({data, isCustomer, isRegister}) {
  const { setUsername, setStat } = useContext(UserContext);
  const [customerUsername, setCustomerUsername] = useState('');
  const [customerPassword, setCustomerPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmitCustomer = async (e) => {
    e.preventDefault();
      try {
        const url = `${data}customerlogin`;
        console.log('Customer Login URL:', url);
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
        console.error('Error in Customer Login:', error);
        alert('An error occurred while logging in. Please try again.');
      }
  };

  console.log(isCustomer);
  return (
    <section className={`absolute w-full h-full flex flex-col justify-center items-center ${isCustomer ? 'block' : 'hidden'}`}> 
      <form onSubmit={handleSubmitCustomer} className='w-full flex flex-col justify-center items-center h-[70%]'>
        <input
          type="text" 
          name="username" 
          placeholder='Username' 
          value={customerUsername}
          onChange={(e) => setCustomerUsername(e.target.value)}
          className='w-[60%] p-2 border'
          /><br />
        <input 
          type="password"
          name="password" 
          value={customerPassword}
          onChange={(e) => setCustomerPassword(e.target.value)}
          placeholder='Password'
          className='w-[60%] p-2 border'
          /> <br />
        <button type='submit' className='w-[60%] border p-2  mt-10 cursor-pointer'>Log In</button>
      </form>
      <div className='w-full h-[20%] flex flex-col justify-start items-center bg-blue-400'>
        <button onClick={() => isRegister(true)}
           className='w-[60%] border p-2 bg-blue-200 flex justify-center items-center'>
            CREATE NEW ACCOUNT</button>
      </div>
      <div className='w-full h-[10%] flex flex-row justify-between items-center bg-red-300 px-2'>
        <a href="">Help?</a>
        <a href="">Forgot Password?</a>
      </div>
    </section>
  );
}

export default CustomerLogin;