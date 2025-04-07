import React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function AdminAdd({data}) {
  const [adminData, setAdminData] = useState([]);
  const adminAcc = useRef([]);

  console.log(data);
  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const response = await axios.get(`${data}getCustomerAcc`);
      adminAcc.current = response.data;
      setAdminData(adminAcc.current);
    }catch (error) {
      console.error('Error fetching admin data:', error);
    }
  }

  

  console.log(adminData);
  return (
    <div className=' flex flex-col items-center w-full '>
      <h2 className='mt-5 mb-2 text-[20pt]'>CUSTOMER ACCOUNTS</h2>
      <div>
            <table className=" w-[100%] border-2">
              <thead className='bg-blue-400'>
                <tr className='border-2'>
                  <th className='border-2 pl-3 pr-3'>C_ID</th>
                  <th className='border-2 pl-3 pr-3 w-[300px]'>CUSTOMER NAME</th>
                  <th className='border-2 pl-3 pr-3 w-[200px]'>EMAIL</th>
                  <th className='border-2 pl-3 pr-3 w-[300px]'>ADDRESS</th>
                  <th className='border-2 pl-3 pr-3 w-[200px]'>PHONE NUMBER</th>
                  <th className='border-2 pl-3 pr-3 w-[100px]'>USERNAME</th>
                  <th className='border-2 pl-3 pr-3'>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {adminData.length > 0 ? (
                  adminData.map((customer, index) => (
                    <tr key={index}>
                      <td className='text-center'>{customer.customer_id}</td>
                      <td className='text-center uppercase'>{`${customer.first_name} ${customer.last_name}`}</td>
                      <td className='text-center'>{`${customer.email} `}</td>
                      <td className='text-center uppercase'>{`${customer.address}, ${customer.province}, ${customer.city}`}</td>
                      <td className='text-center'>{customer.phone_number}</td>
                      <td className='text-center'>{customer.username}</td>
                      <td className='text-center flex flex-row'>
                        <form action="">
                          <input type="hidden" name='delete' value={customer.customer_id}/>
                          <button className='bg-red-400 p-1 m-2 border rounded-lg'>DELETE</button>
                        </form>
                        <form action="">
                          <input type="hidden" name='update' value={customer.customer_id} />
                        <button className='bg-blue-400 p-1 m-2 border rounded-lg'>UPDATE</button>
                        </form>
                      </td>
                    </tr> 
                  ))) : (
                    <tr>
                      <td colSpan="7" className="text-center">No data available</td>
                    </tr>
                )}
              </tbody>
            </table>
      </div>  
    </div>
  );
}

export default AdminAdd;