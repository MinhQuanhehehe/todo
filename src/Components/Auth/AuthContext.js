import React, { useState, useContext } from 'react';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(() => localStorage.getItem('userId'));

  const login = (id) => {
    setUserId(id);
    localStorage.setItem('userId', id);
  };
  const logout = () => {
    setUserId(null);
    localStorage.removeItem('userId');
  };
  return (
    <AuthContext.Provider value={{ userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);