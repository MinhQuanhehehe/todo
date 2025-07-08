import React from 'react'
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Item from './Item';


const SearchedTasks = ({ handleCheck, handleDelete, handlePending, tasks, searching, setSearching, loadingCheckIds, loadingPendingIds, loadingDeleteIds }) => {
    const newTasks = tasks.filter((task) => task.title.toLowerCase().includes(searching.toLowerCase()));
    return (
        <main className='grow flex flex-col bg-[#EAE7D6] p-6'>
            <div className='flex justify-between items-center mb-4'>
                <h1 className='text-xl font-bold'>Searched</h1>
                <Link to="/" className='bg-[#B0D4B8] hover:bg-[#A4C3A2] text-[#5D7B6F] p-2 duration-300 rounded-md' >Back to Dashboard</Link>
            </div>
            {searching && newTasks.length !== 0 ? (
                <ul className='overflow-y-auto grow sm:h-10'>
                    {newTasks.map((task) => (
                        <Item
                            key={task.id}
                            task={task}
                            handleCheck={handleCheck}
                            handleDelete={handleDelete}
                            handlePending={handlePending}
                            loadingCheckId={!!loadingCheckIds[task.id]}
                            loadingPendingId={!!loadingPendingIds[task.id]}
                            loadingDeleteId={!!loadingDeleteIds[task.id]}
                        />
                    ))}
                </ul>
            ) : (
                <p>No Task Found</p>
            )}
        </main>
    )
}

export default SearchedTasks