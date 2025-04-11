import React from 'react';
import { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import Adding from './addprod';
import ConfirmedCode from './confirmed/confirmedCode';
import { UserContext } from '../context/userContext';

function Inventory({api, date}) {
  const { isAdminCode } = useContext(UserContext);
  const [addBtn, setAddBtn] = useState(false);
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

  const addProduct = () => {
    setAddBtn(!addBtn);
    console.log(addBtn);
  }

  return (
    <div className='w-full h-screen flex flex-col items-center'>
  {/* menu and search button */}
      <div className='w-full h-[10%] flex flex-row bg-amber-200'>
        <div className='w-[50%] flex flex-row justify-start items-center bg-red-300'>
          <button className=' m-4 px-4 py-1 border cursor-pointer flex justify-center items-center' title="Add Product" onClick={addProduct}>
            ADD ITEM
          </button>
        </div>
        <div className='w-[50%] flex flex-row justify-end items-center'> 
          <input type="search" className='border m-4 rounded-md w-[50%] px-3 py-1' />
        </div>
      </div>
  {/* inventory table */}
      <div className='w-full h-[90%] flex justify-center items-center relative'>
        <div className='w-full h-[100%] flex flex-col items-center'>
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
                    <td className='text-start px-4' >{inv.item_name}</td>
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
{/* Add Product Table */}
        <Adding api={api} isBtn={addBtn} setIsBtn={setAddBtn} date={date}/>
      </div>

    </div>
  );
}

export default Inventory;