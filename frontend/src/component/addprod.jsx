import axios from 'axios';
import React from 'react';
import { useState, useEffect, useRef } from 'react';

function AddProduct({api, isBtn, setIsBtn, date}) {
  const [categoryList, setCategoryList] = useState([]);
  const categoryListRef = useRef([]);

  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [img, setImg] = useState('');
  const [category, setCategory] = useState('');
  const [qty, setQty] = useState('');
  const [unitPrice, setUnitPrice] = useState('');

  useEffect(() => {
    fetchCategoryList();
  }, []);

  const fetchCategoryList = async () => {
    const response = await axios.get(`${api}fetchCategoryList`);
    console.log('Fetched Category List:', response.data);
    categoryListRef.current = response.data;
    setCategoryList(categoryListRef.current);
  }

  const addProduct = async (e) => {
    e.preventDefault();
    
    const data = {
      productName: productName,
      description: description,
      category: category,
      img: img,
      qty: qty,
      unitPrice: unitPrice,
      dateAdded: date
    }

    if (!productName || !description || !category || !qty || !unitPrice) {
      alert("Please fill all the fields.");
      return;
    }

    const userConfirmed = confirm("Are you sure you want to save this data?");
      if (!userConfirmed) {
        console.log("User cancelled the action.");  
        return;
      }

    console.log('Data to be sent:', data);
      try {
        const response = await axios.post(`${api}addProduct`, data);
        console.log('Response from server:', response.data);
      } catch (error) {
        console.error('Error adding product:', error);
      }

      setProductName('');
      setDescription('');
      setCategory('');
      setQty('');
      setUnitPrice('');

      window.location.reload();
  }

  const btnWind = () => {
    setIsBtn(!isBtn);
    setProductName('');
    setDescription('');
    setCategory('');
    setQty('');
    setUnitPrice('');
  }

  console.log(productName);
  console.log(description);
  console.log(category);
  console.log(qty);
  console.log(unitPrice);

  console.log(api);
  console.log(categoryListRef);
  console.log(date);
  return (
    <section className={`w-[600px] h-[300px] bg-[#f1e7fd] border-2 rounded-lg absolute mt-[-200px] flex flex-col items-center justify-center ${isBtn ? 'block' : 'hidden'}`}>
    {/* header */}
      <div className='w-full h-[10%] flex flex-row justify-between items-center mt-2'>
        <h2 className='ml-4'>Adding Product. . .</h2>
        <button className='mr-4 cursor-pointer' onClick={btnWind}>&#10060;</button>
      </div>
    {/* body */}
      <div className='w-full h-[90%] flex flex-col items-center'>
        <form action="" className='w-[90%] h-full flex flex-col items-center'>
          <div className='w-[90%] flex flex-row items-center mt-2'>
            <label className='w-[25%]'>Product Name : </label> 
            <input  type="text" 
                    name="itemName"
                    className='border w-[75%]' 
                    value={productName}
                    onChange={(e) => {setProductName(e.target.value)}}
                    required/>
          </div>
          <div className='w-[90%] flex flex-row items-center mt-2'>
            <label className='w-[20%]'>Upload Img : </label>
            <input  type="file" 
                    name="img"
                    accept="image/*"
                    onChange={(e) => {setImg(e.target.files[0])}}
                    required
                    className='border w-[40%] ml-2 text-none'
                    />
          </div>
          <div className='w-[90%] flex flex-col items-start mt-1'>
            <label htmlFor="">Description:</label>
            <textarea 
                      rows="4" 
                      cols="50"
                      name="description"
                      className='border w-full h-15 flex justify-start items-start resize-none px-2 py-1' placeholder="Type your description here..." 
                      value={description}
                      onChange={(e) => {setDescription(e.target.value)}}
                      required></textarea>
          </div>
          <div className='flex flex-row justify-start items-center w-[90%] mt-2 flex-wrap'>
            <label htmlFor="" className='w-[17%]'>Category :</label>
            <select name="category" 
                    className='border' 
                    value={category}
                    onChange={(e) => {setCategory(e.target.value)}}
                    required>
              <option>Select Category</option>
              {categoryList.map((cat, index) => (
                <option key={index} 
                        value={cat.category_name}>
                          {cat.category_name}
                </option>
              ))}
            </select>
            <label htmlFor="" className='w-auto m-2'>Qty : </label>
            <input type="number" 
                   className='border w-[10%] appearance-none' 
                   placeholder='' 
                   value={qty}
                    onChange={(e) => {setQty(e.target.value)}}
                   required/>
            <label htmlFor="" className='m-1'>Unit Price :</label>
            <input type="number" 
                   className='border w-[16.7%]' 
                   value={unitPrice}
                    onChange={(e) => {setUnitPrice(e.target.value)}}
                   required/>
          </div>
          <div className='w-[90%] flex flex-row justify-evenly items-center mt-1'>
            <button className='border px-10 py-2 bg-orange-300 rounded-lg'>CLEAR</button>
            <button className='border px-12 py-2 bg-green-300 rounded-lg' onClick={addProduct}>ADD</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddProduct;