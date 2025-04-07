import React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function Inventory({api}) {
  const [inventoryData, setInventoryData] = useState([]);
  const inventData = useRef([]);

  console.log(api);
  console.log(inventData);
  useEffect(() => {
    fetchDataInventory();
  }, []);

  const fetchDataInventory = async () => {
    try {
      const response = await axios.get(`${api}fetchDataInventory`);
      console.log('Fetched Inventory Data:', response.data);
      inventData.current = response.data;
      setInventoryData(inventData.current);
    }catch (error) {
      console.error('Error fecthing inventory data: ', error);
    }
  }

  return (
    <div className='w-full h-screen flex flex-row items-center'>
      <div className='w-[10%] h-full bg-gray-300'>
      </div>
      <div className='w-[90%] h-full flex flex-col items-center'>
        <h2 className='mt-5 mb-2 text-[20pt]'>INVENTORY</h2>
        <table className=" w-auto border-2">
          <thead className='bg-blue-400'>
            <tr className='border-2'>
              <th className='border-2 pl-3 pr-3 w-[10px]'>P_ID</th>
              <th className='border-2 pl-3 pr-3 w-[350px]'>PRODUCT NAME</th>
              <th className='border-2 pl-3 pr-3 w-[150px]'>CATEGORY</th>
              <th className='border-2 pl-3 pr-3 w-[50px]'>QTY</th>
              <th className='border-2 pl-3 pr-3 w-[120px]'>UNIT PRICE</th>
              <th className='border-2 pl-3 pr-3 w-[100px]'>TOTAL</th>
              <th className='border-2 pl-3 pr-3 w-[180px]'>DATE ADDED</th>
              <th className='border-2 pl-3 pr-3 w-[100px]'>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {inventoryData.length > 0 ? (
              inventoryData.map((inv, index) => (
                <tr key={index} title={`DESCRIPTION: ${(inv.description)}`}>
                  <td className='text-center '>{inv.item_id}</td>
                  <td className='text-center ' >{inv.item_name}</td>
                  <td className='text-center '>{inv.category_name || 'No Category'}</td>
                  <td className='text-center '>{inv.quantity_in_stock}</td>
                  <td className='text-center '>&#8369;{inv.unit_price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                  <td className='text-center'>&#8369;{(inv.quantity_in_stock * inv.unit_price).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                  <td className='text-center'>{inv.date_added}</td>
                  <td className='flex flex-row items-center'>
                    <form action="">
                      <input type="hidden" name='delete' value={inv.item_id}/>
                      <button className='bg-red-400 p-1 m-2 border rounded-lg'>DELETE</button>
                    </form>
                    <form action="">
                      <input type="hidden" name='update' value={inv.item_id} />
                      <button className='bg-blue-400 p-1 m-2 border rounded-lg'>UPDATE</button>
                    </form>
                  </td>
                </tr>
              ))) : (
              <tr>
                <td colSpan="8" className="text-center">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
    </div>
  );
}

export default Inventory;