import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

function AdminCode({api, isAdminCode, setIsAdminCode, setIsAdmin, setIsCustomer}) {
  const [adminCode, setAdminCode] = useState('');

  const adminCodeInfo = async (e) => {
    e.preventDefault();

    const data = {
      adminCode: adminCode
    }

    if (!adminCode) {
      alert("Please fill all the fields.");
      return;
    }

    try {
      const response = await axios.post(`${api}adminCode`, data);
      console.log('Response from server:', response.data);
      if (response.data.success) {
        alert("Admin Code Accepted.");
        setAdminCode(response.data.code);
        setIsAdminCode(false);
        setIsAdmin(true);
        setIsCustomer(false);
      } else {
        alert("Invalid Admin Code.");
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }

    setAdminCode('');
  }

  return (
    <div className={`w-[500px] h-[100px] bg-red-100 flex flex-col absolute justify-center items-center top-30 ${isAdminCode ? 'block' : 'hidden'}`}>
      <button className='w-full bg-amber-100 h-[30%] flex justify-end items-center px-3' onClick={() => setIsAdminCode(false)}>&#10060;</button>
      <form onSubmit={adminCodeInfo} className='w-full h-[70%] flex flex-col justify-center items-center bg-amber-500'>
        <input 
          type="password" 
          name="adminCode" 
          className='border w-[80%] h-[50%] px-2' 
          placeholder='Enter Admin Code'
          value={adminCode} 
          onChange={(e) => {setAdminCode(e.target.value)}}
          required/>
        <button 
          type="submit"
          className='hidden' 
          >Sumbit</button>
      </form>
    </div>
  );
}

export default AdminCode;