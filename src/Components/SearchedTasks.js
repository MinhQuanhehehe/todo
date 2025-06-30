import React from 'react'
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Item from './Item';


const SearchedTasks = ({ handleCheck, handleDelete, handlePending, tasks, searching, setSearching }) => {
    return (
        <main className='grow flex flex-col bg-[#EAE7D6] p-6'>
            <div className='flex justify-between items-center mb-4'>
                <h1>Searched</h1>
                <Link to="/" className='bg-[#B0D4B8] hover:bg-[#A4C3A2] text-[#5D7B6F] p-2  text-white rounded-md' >Back to Dashboard</Link>
            </div>
            {(searching) ? (
            <ul className='grow overflow-y-auto'>
                {tasks.filter((task) => task.title.toLowerCase().includes(searching.toLowerCase())).map((task) => (
                    <Item 
                        key={task.id} 
                        task={task} 
                        handleCheck={handleCheck} 
                        handleDelete={handleDelete} 
                        handlePending={handlePending} 
                    />
                ))}
            </ul>
            ) : (
                null
            )
            }
        </main>
    )
}

export default SearchedTasks