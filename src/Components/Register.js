import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { registerApi } from '../api/api';
import { toast } from 'react-toastify';
import { useAuth } from './Auth/AuthContext';
import { GET, POST } from '../api/api'; // Adjust the import path as necessary

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Kiểm tra email đã tồn tại chưa (nên fetch trước)
      const res = await GET();
      const users = res.data;
      if (users.find(u => u.email === email)) {
        toast.error('Email exists! Please use another email.');
        return;
      }
      const newUser = {
        email,
        password,
        role: 'user',
        name: email.split('@')[0],
        tasks: []
      };
      await POST(newUser);
      toast.success('Success! Please log in.');
      navigate('/login');
    } catch (err) {
      toast.error('Failed to register! Please try again.');
    }
  };

  return (
    <div className='fixed flex items-center justify-center min-h-screen bg-black/20 w-full z-999'>
      <form className='flex flex-col bg-white p-6 shadow-md rounded-lg w-1/2 h-1/2 min-w-80'
        onSubmit={handleRegister}
      >
        <div className='flex justify-between items-center'>
          <h2 className='text-xl font-bold'>Sign Up</h2>
        </div>
        <label className='mb-2'>
          Email:
          <input type='email' className='border border-gray-300 rounded-md p-2 w-full' placeholder='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <label className='mb-4'>
          Password:
          <input type='password' className='border border-gray-300 rounded-md p-2 w-full' placeholder='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <button type='submit' className='bg-[#B0D4B8] hover:bg-[#A4C3A2] text-[#5D7B6F] font-bold py-2 px-4 rounded'
        >Register</button>
        <a href='/login' className='mt-2 text-gray-500'>Log In</a>
      </form>
    </div>
    // <form onSubmit={handleRegister}>
    //   <input
    //     value={email}
    //     onChange={e => setEmail(e.target.value)}
    //     placeholder="Email"
    //     type="email"
    //     required
    //   />
    //   <input
    //     value={password}
    //     onChange={e => setPassword(e.target.value)}
    //     placeholder="Password"
    //     type="password"
    //     required
    //   />
    //   <button type="submit">Đăng ký</button>
    // </form>
  );
};

export default Register;