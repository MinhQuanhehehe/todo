import React, { useState, useEffect } from 'react'
import { DELETE, GET } from '../api/api';
import { toast } from 'react-toastify';

const UserList = ({ users, handleDeleteUser, loadingUserIds }) => {
    return (
        <main className=' grow flex flex-col bg-[#EAE7D6] p-6'>
            <div className='flex justify-between items-center mb-4'>
                <h1 className='font-bold text-xl'>User List</h1>
            </div>
            <ul className='overflow-y-auto grow sm:h-10'>
                {users.length != 0 ? (
                    users.map((user) => (
                        <li
                            key={user.id}
                            className="flex items-center justify-between shadow-lg rounded-2xl p-5 bg-white my-3"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="text-gray-700">
                                    <p className="font-semibold">UserID: <span className="text-[#5d7b6f]">{user.id}</span></p>
                                    <p className="font-semibold">Name: <span className="text-[#8fb898]">{user.name}</span></p>
                                    <p className="text-sm text-gray-500">Email: {user.email}</p>
                                </div>
                            </div>
                            <button
                                className="bg-[#B0D4B8] hover:bg-[#8fb898] text-[#5D7B6F] font-semibold py-2 px-6 rounded-lg ml-4 "
                                onClick={() => handleDeleteUser(user.id)}
                                disabled = {!!loadingUserIds[user.id]}
                            >
                                Delete
                            </button>
                        </li>
                    ))
                ) : (
                    <p>No User Found</p>
                )}
            </ul>
        </main>
    )
}

export default UserList