import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from './Auth/AuthContext';

const Footer = ({ users }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('userId');
    logout();
    toast.success('Successfully logged out!');
    navigate('/login', { replace: true });
  };

  return (
    <footer className='p-2 bg-[#5D7B6F] flex justify-around items-center'>
      <h1 className='text-4xl font-bold text-white'>Todo app</h1>
      <div className='flex justify-center '>
        <p className='font-semibold text-white mx-4'>Number of Users: {users.length}</p>
        <button onClick={handleLogout} className='text-white mx-4 hover:underline'>Log out</button>
      </div>
    </footer>
  )
}

export default Footer