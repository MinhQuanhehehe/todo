import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerApi } from '../api/api';
import { toast } from 'react-toastify';
import { useAuth } from './Auth/AuthContext'; 

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await registerApi(email, password);
      localStorage.setItem('token', res.data.token);
      toast.success('Đăng ký thành công!');
      login(res.data.token);
      navigate('/login');
    } catch (err) {
      toast.error('Đăng ký thất bại!');
    }
  };

  return (
    <div className='fixed flex items-center justify-center min-h-screen bg-black/20 w-full z-999'>
            <form className='flex flex-col bg-white p-6 shadow-md rounded-lg w-1/2 h-1/2'
                onSubmit={handleRegister}
            >
                <div className='flex justify-between items-center'>
                    <h2 className='text-xl font-bold'>Sign Up</h2>
                </div>
                <label className='mb-2'>
                    Email:
                    <input type='text' className='border border-gray-300 rounded-md p-2 w-full' placeholder='Email'
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
                <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
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