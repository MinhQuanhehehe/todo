// import React from 'react'
// import { useLocation, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { useAuth } from './Auth/AuthContext';

// const Footer = () => {
//   const navigate = useNavigate();
//   const { logout } = useAuth();
//   const location = useLocation();
//   const currentPath = location.pathname;

//   const handleLogout = () => {
//         localStorage.removeItem('userId');
//         logout();
//         toast.success('Successfully logged out!');
//         navigate('/login');
//     };

//   return (
//     <footer className='h-[6%] bg-[#5D7B6F] flex justify-around items-center'>
//       <h1 className='text-4xl font-bold text-white'>Todo app</h1>
//       <button onClick={handleLogout} className='text-white'>Log out</button>
//     </footer>
//   )
// }

// export default Footer