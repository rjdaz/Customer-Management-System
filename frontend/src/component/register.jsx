import React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function RegistrationForm({api, isRegister, setIsRegister}) {
  const [provinceList, setProvinceList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [countryList, setCountryList] = useState([]);

  const province_API = 'https://psgc.gitlab.io/api/provinces/';
  const city_API = 'https://psgc.gitlab.io/api/cities/';
  const country_API = 'https://restcountries.com/v3.1/all';
  
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [postal_code, setPostalCode] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  
  useEffect(() => {
    provinceAPI();
    cityAPI();
    countryAPI();
  }, [province_API, city_API, country_API]);

  const submitForm = async (e) => {
    e.preventDefault();

    const data = {  
      firstname: firstname,
      lastname: lastname,
      email: email,
      phone_number: phone_number,
      address: address,
      province: province,
      city: city,
      country: country,
      postal_code: postal_code,
      username: username,
      password: password,
      confirm_password: confirm_password
    }

    console.log(data);

      if (!firstname || !lastname || !email || !phone_number || !address || !province || !city || !country || !postal_code || !username || !password || !confirm_password) {
        alert("Please fill all the fields.");
        return;
      }

      if (password !== confirm_password) {
        alert("Password and Confirm Password do not match.");
        setPassword('');
        setConfirmPassword('');
        return;
      }

    const userConfirmed = confirm("Are you sure you want to save this data?");
      if (!userConfirmed) {
        console.log("User cancelled the action.");  
        return;
      }

      try {
        const response = await axios.post(`${api}register`, data);
        console.log('Response from server:', response.data);
        alert(response.data.error);
      } catch (error) {
        console.error('Error during registration:', error);
        alert("An error occurred during registration. Please try again.");
      }
    
  }

  const provinceAPI = () => {
    fetch(province_API)
      .then((response) => response.json())
      .then((data) => {
        const provinces = data.map((province) => province.name);
        setProvinceList(provinces);
      })
      .catch((error) => console.error('Error fetching province data:', error));
  }

  const cityAPI = () => {
    fetch(city_API)
      .then((response) => response.json())
      .then((data) => {
        const cities = data.map((city) => city.name.replace(/^City of /, ''));
        setCityList(cities);
      })
      .catch((error) => console.error('Error fetching city data:', error));
  }

  const countryAPI = () => {
    fetch(country_API)
      .then((response) => response.json())
      .then((data) => {
          const countries = data.map((country) => country.name.common);
          setCountryList(countries);
      })
      .catch((error) => console.error('Error fetching country data:', error));
  }

  const cleardata = () => {
    setFirstname('');
    setLastname('');
    setEmail('');
    setPhoneNumber('');
    setAddress('');
    setProvince('');
    setCity('');
    setCountry('');
    setPostalCode('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  }

  const clearBtn = (e) => {
    e.preventDefault();
    const userConfirmed = confirm("Are you sure you want to clear the form?");

      if (userConfirmed) {
        cleardata();
        console.log("Form cleared.");
      } else {
        console.log("User cancelled the action.");
      }
  }

  const handleXbtn = () => {
    cleardata();
    setIsRegister(false);
  }

  return (
    <div className={`mt-[-50px] absolute w-[50%] h-[80%] flex flex-col justify-center items-center bg-gray-300 rounded-xl ${isRegister ? 'block' : 'hidden'}`}>
      <div className='w-full h-[10%] flex flex-row justify-between items-center bg-red-200 px-5 rounded-t-xl'>
        <h1 className='w-full text-[15pt]'>Registration Form. . .</h1>
        <button className='cursor-pointer' onClick={handleXbtn}>&#10060;</button>
      </div>
      <form onSubmit={submitForm} action="" className='w-[90%] h-[90%] flex flex-col justify-start items-center gap-[10px] bg-amber-200 '>
  {/* Full Name */}
        <div className='w-full h-auto flex flex-row justify-between items-center flex-wrap bg-violet-300'>
          <label className='w-full bg-red-200' htmlFor="">FULL NAME :</label>
            <div className='w-[50%]'>
              <input 
                type="text" 
                name='firstname'
                id='firstname'
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
                placeholder='Enter your firstname'
                className='w-[95%] mt-2 p-1 border rounded-md'/>
            </div>
            <div className='w-[50%]'> 
              <input 
              type="text" 
              name='lastname'
              id='lastname'
              required
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              placeholder='Enter your lastname'
              className='w-[95%] mt-2 p-1 border rounded-md'/>
            </div>
        </div>
  {/* Email and Phone Number */}
        <div className='w-full h-auto flex flex-row justify-between items-center flex-wrap bg-violet-300'>
          <label className='w-[50%] bg-red-200' htmlFor="">EMAIL :</label> 
          <label className='w-[50%] bg-red-200' htmlFor="">PHONE NUMBER :</label>
          <div className='w-[50%]'>
            <input 
              type="email" 
              name='email'
              id='email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
              className='w-[90%] mt-2 p-1 border rounded-md'/>
          </div>
          <div className='w-[50%]'>
            <input 
              type="number"
              name='phone_number'
              id='phone_number'
              required
              minLength={11}
              maxLength={11}
              value={phone_number}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder='Phone Number'
              className='w-[50%] mt-2 p-1 border rounded-md'/>
          </div> 
        </div>
  {/* Address */}
        <div className='w-full h-auto flex flex-row justify-start items-center flex-wrap bg-violet-300'>
          <label className='w-[100%] bg-red-200' htmlFor="">ADDRESS :</label>
          <input 
          type="text" 
          name='address'
          id='address'
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder='Enter your house No. and St. No. Barangay'
          className='w-[63%] mt-2 p-1 mr-5 border rounded-md'
          />
          <select
            name="province"
            id="province"
            required
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            className="w-[30%] mt-2 p-1 mr-5 border rounded-md"
          >
            <option value="">Select your province</option>
            {provinceList.sort((a, b) => a.localeCompare(b)).map((province, index) => (
              <option key={index} value={province}>
                {province}
              </option>
            ))}
          </select>
          <select 
            name="city" 
            id="city"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className='w-[30%] mt-2 p-1 mr-5 border rounded-md'
            >
            <option value="">Select your city</option>
            {cityList.sort((a, b) => a.localeCompare(b)).map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
          <select 
            name="country" 
            id="country"
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className='w-[30%] mt-2 p-1 mr-5 border rounded-md'>
              <option value="">Select your country</option>
              {countryList.sort((a, b) => a.localeCompare(b)).map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
          </select>
          <input 
            type="text"
            name='postal_code'
            id='postal_code'
            required
            value={postal_code}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder='Enter your postal code'
            className='w-[30%] mt-2 p-1 mr-5 border rounded-md'/>
        </div>  
  {/* Username and Password */}
        <div className='w-full h-[30%] flex flex-col justify-evenly items-center flex-wrap bg-violet-300'>
          <input 
            type="text"
            name='username'
            id='username'
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Enter your username'
            className='p-1 w-[30%] border rounded-md'/>
          <input 
            type="password"
            name='password'
            id='password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter your password'
            className='p-1 w-[30%] border rounded-md'/>
          <input 
            type="password"
            name='confirm_password'
            id='confirm_password'
            required
            value={confirm_password}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirm your password'
            className='p-1 w-[30%] border rounded-md'/>
        </div>
  {/* button */}
        <div className='w-full h-[15%] flex flex-row justify-evenly items-center bg-violet-300'>
          <button 
            className='border px-10 py-2 bg-orange-300 rounded-lg'
            onClick={clearBtn}
            >CLEAR</button>
          <button 
            className='border px-12 py-2 bg-green-300 rounded-lg'
            type='submit'
            >REGISTER</button>
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;