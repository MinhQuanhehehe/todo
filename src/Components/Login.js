import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from './Auth/AuthContext';
import { GET } from '../api/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await GET();
            const users = res.data;
            console.log(users);
            const user = users.find(u => u.email === email && u.password === password);
            if (user) {
                localStorage.setItem('userId', user.id);
                login(user.id);
                toast.success('Success!');
                navigate('/');
            } else {
                toast.error('Failed to login! Please check your email and password.');
            }
        } catch (err) {
            toast.error('Error!');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='fixed flex items-center justify-center min-h-screen bg-black/20 w-full z-999'>
            <form className='flex flex-col bg-white p-6 shadow-md rounded-lg w-1/2 h-1/2 min-w-80'
                onSubmit={handleLogin}
            >
                <div className='flex justify-between items-center'>
                    <h2 className='text-xl font-bold'>Log in</h2>
                </div>
                <label className='mb-2'>
                    Email:
                    <input type='email' className='border border-gray-300 rounded-md p-2 w-full' placeholder='Email'
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </label>
                <label className='mb-4'>
                    Password:
                    <input type='password' className='border border-gray-300 rounded-md p-2 w-full' placeholder='Password'
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </label>
                <button type='submit' className='bg-[#B0D4B8] hover:bg-[#A4C3A2] text-[#5D7B6F] font-bold py-2 px-4 rounded' disabled={loading}
                >{loading ? "Loading" : "Log in"}</button>
                <a href='/register' className='mt-2 text-gray-500'>Sign Up</a>
            </form>
        </div>
    );
};

export default Login;