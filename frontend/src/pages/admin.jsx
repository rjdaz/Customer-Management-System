import React from 'react';
import {useState, useEffect} from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

function Admin({data}) {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('dashboard');

  const links = [
    { path: '/admin/', label: 'DASHBOARD', key: 'dashboard' },
    { path: '/admin/customer_acc', label: 'CUSTOMER ACCOUNT', key: 'customer_acc' },
    { path: '/admin/inventory', label: 'INVENTORY', key: 'inventory' },
    { path: '/admin/complaints', label: 'COMPLAINTS', key: 'complaints' },
  ];

  useEffect(() => {
    const currentLink = links.find((link) => link.path === location.pathname);
    if (currentLink) {
      setActiveLink(currentLink.key);
    }
  }, [location.pathname, links]);

  return (
    <div className="h-screen bg-gray-100">
      <header className="w-full bg-[#f1e7fd] flex items-center">
        <nav className="flex flex-row w-full">
          {links.map((link) => (
            <Link
              key={link.key}
              to={link.path}
              className={`w-auto p-2 ${
                activeLink === link.key ? 'bg-[#5c0dc6] text-white' : 'bg-[none] text-black'
              }`}
              onClick={() => setActiveLink(link.key)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>
      <main>
        <Outlet/>
      </main>
    </div>
  );
}

export default Admin;