import React from 'react';
import CustomerLogin from '../component/customerlogin'
import AdminLogin from '../component/adminlogin'

function Login({data}) {

  const customerWindow = () => {

  }

  const adminWindow = () => {

  }

  return (
    <div className='flex flex-row items-center justify-center h-screen bg-gray-100'>
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
            <CustomerLogin data={data} />
    {/* for admin login */}
            <AdminLogin data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;