import React from 'react';
import axios from 'axios';
import { useState, useEffect, useRef, useContext } from 'react';
import { UserContext } from '../context/userContext';
import CustomerLogin from '../component/customerlogin'
import AdminLogin from '../component/adminlogin'
import RegistrationForm from '../component/register'
import AdminCode from '../component/confirmed/confirmedCode';

function Login({data}) {
  const {
    isAdminCode,
    setIsAdminCode,
    isCustomer,
    setIsCustomer,
    isAdmin,
    setIsAdmin,
    isRegister,
    setIsRegister,
  } = useContext(UserContext);

  // const [isAdminCode, setIsAdminCode] = useState(false);
  // const [isCustomer, setIsCustomer] = useState(true);
  // const [isAdmin, setIsAdmin] = useState(false);
  // const [isRegister, setIsRegister] = useState(false);

  const customerWindow = () => {
    setIsCustomer(true);
    setIsAdmin(false);
  }

  const adminWindow = () => {
    setIsAdminCode(true);
  }

  return (
    <div className='flex flex-row items-center justify-center h-screen bg-gray-600 relative'>
      <div className='w-full h-full flex flex-row'>
        <div className='w-3/6 h-full bg-red-400 flex justify-center items-center'>
          LOGO and some text info
        </div>
        <div className='w-3/6 h-full bg-blue-400 relative flex flex-col justify-center items-center'>
          <div className='w-[60%] h-[70%] bg-amber-200'>
            <div className='w-full h-[10%] bg-amber-500 flex'>
              <button className='w-[50%] cursor-pointer' onClick={customerWindow}>CUSTOMER</button>
              <button className='w-[50%] cursor-pointer' onClick={adminWindow}>ADMIN</button>
            </div>
            <div className='w-full h-[90%] relative'>
      {/* for customer login */}
              <CustomerLogin data={data} isCustomer={isCustomer} isRegister={setIsRegister}/>
      {/* for admin login */}
              <AdminLogin data={data} isAdmin={isAdmin} />
            </div>
          </div>
        </div>
      </div>
  {/* Registration Form */}
      <RegistrationForm api={data} isRegister={isRegister} setIsRegister={setIsRegister}/>
  {/* Admin Code */}
      <AdminCode api={data} isAdminCode={isAdminCode} setIsAdminCode={setIsAdminCode} setIsAdmin={setIsAdmin} setIsCustomer={setIsCustomer}/>
    </div>
  );
}

export default Login;