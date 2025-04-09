import { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, UserContext } from './context/userContext';
import axios from 'axios';
import MainLayOut from './layout/mainlayout';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import Login from './pages/login';
import Admin from './pages/admin';
import Client from './pages/client';
import Customer_acc from './component/customer_acc';
import Admindashboard from './component/admindashboard';
import Inventory from './component/inventory';
import Admincomplaints from './component/complaints';
import AddProduct from './component/addprod';

const apiUrl = 'http://localhost/web2FinalProject/backend/api.php?action=';

function AppRoutes() {
  const { username, stat } = useContext(UserContext);
  const [data, setData] = useState([]);
  const date = new Date();

  const currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  const currentTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  const currentDateTime = `${currentDate} ${currentTime}`;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
    const response = await axios.get(`${apiUrl}fetch`);
    data.current =response.data;
    setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayOut />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login data={apiUrl}/>} />
            <Route path="admin" element={<Admin data={apiUrl} />}>
              <Route index element={<Admindashboard data={apiUrl}/>} />
              <Route path="customer_acc" element={<Customer_acc data={apiUrl} />} />
              <Route path="inventory" element={<Inventory api={apiUrl} date={currentDateTime}/>} />
              <Route path="complaints" element={<Admincomplaints data={apiUrl} />} />
            </Route>
              <Route path=":username" element={<Client data={apiUrl}/>} />  
              <Route path="logout" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

function App() {
  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  );
}

export default App
