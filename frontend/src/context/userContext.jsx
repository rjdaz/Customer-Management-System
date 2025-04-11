import React, {createContext, useState} from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [username, setUsername] = useState(''); 
  const [stat, setStat] = useState(''); 
  const [isAdminCode, setIsAdminCode] = useState(false);
  const [isCustomer, setIsCustomer] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  return (
    <UserContext.Provider value={{ 
      username, 
      setUsername, 
      stat, 
      setStat, 
      isAdminCode, 
      setIsAdminCode,
      isCustomer,
      setIsCustomer,
      isAdmin,
      setIsAdmin,
      isRegister,
      setIsRegister,
      }}>
      {children}
    </UserContext.Provider>
  )
}