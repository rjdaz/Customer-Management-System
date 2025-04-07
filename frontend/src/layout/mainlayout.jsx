import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { UserContext } from '../context/userContext';

function MainLayOut() {
  const [active, setActive] = useState("/");
  const {username, setUsername} = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedActive = localStorage.getItem('activePath');
    if (storedActive) {
      setActive(storedActive);
    }

    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');
    setActive('/');
    localStorage.setItem('activePath', '/');
  };

  const handleSetActive = (path) => {
    setActive(path);
    localStorage.setItem('activePath', path);
  };

  return (
    <>
      <header className='w-full bg-[#260058] text-white p-4 flex items-center'>
        <h1 className='text-2xl font-bold w-[50%]'>Our Website</h1>
        <nav className='flex w-[50%] justify-end'>
          <ul className='flex justify-end w-[100%]'>
            {["/", "about", "contact", isLoggedIn ? username : "login", isLoggedIn ? 'logout' : ''].map((path) => (
              <li key={path}
               className="text-white relative group cursor-pointer mr-[30px]"
               onClick={() => {
                if (isLoggedIn && path === 'logout') handleLogout();
                else handleSetActive(path);
              }}
              >
                <Link to={path} className='uppercase'>{path === "/" ? "home" : path}</Link>
                <span
                  className={`absolute left-0 bottom-0 h-[2px] bg-[#3674B5] transition-all duration-300 group-hover:w-full group-hover:bottom-[-2px] ${
                    active === path ? "w-full bottom-[-2px]" : "w-0"
                  }`}
                ></span>
              </li>
               
            ))}
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className='w-full bg-[#260058] text-white p-4'>
        <p>Contact</p>
      </footer>
    </>
  );
}

export default MainLayOut;