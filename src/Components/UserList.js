// import React, { useState, useEffect } from 'react'
// import { DELETE, GET } from '../api/api';
// import { toast } from 'react-toastify';

// const UserList = ({ users, setUsers }) => {
//     const handleDeleteUser = async (id) => {
//         try {
//             await DELETE(id);
//             toast.success('User deleted!');
//             setUsers(prev => prev.filter(user => user.id !== id));
//         } catch (error) {
//             toast.error('Delete failed!');
//         }
//     };
//     return (
//         <main className=' grow flex flex-col bg-[#EAE7D6] p-6'>
//             <div className='flex justify-between items-center mb-4'>
//                 <h1 className='font-bold text-xl'>User List</h1>
//             </div>
//             <ul className='overflow-y-auto grow sm:h-10'>
//                 {users.length != 0 ? (
//                     users.map((user) => (
//                         <li key={user.id} className='flex justify-between shadow-md rounded-lg p-4 bg-white my-2 items-center'>
//                             <p className='grow text-center'>{user.id}</p>
//                             <p className='grow text-center'>{user.name}</p>
//                             <p className='grow text-center'>{user.email}</p>
//                             <p className='grow text-center'>{user.role}</p>
//                             <button
//                                 className='bg-[#B0D4B8] hover:bg-[#A4C3A2] text-[#5D7B6F] py-2 px-4 rounded ml-2'
//                                 onClick={() => handleDeleteUser(user.id)}
//                             >
//                                 Delete
//                             </button>
//                         </li>
//                     ))
//                 ) : (
//                     <p>No User Found</p>
//                 )}
//             </ul>
//         </main>
//     )
// }

// export default UserList