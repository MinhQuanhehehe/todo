import React from 'react'
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom';

const Item = ({ handleCheck, handleDelete, handlePending, task }) => {
    const navigate = useNavigate();

    const handleNavigate = (e) => {
        if (
            e.target.tagName === 'BUTTON' ||
            e.target.tagName === 'INPUT'
        ) return;
        navigate(`/itemdetail/${task.id}`);
    };

    return (
        <li
            key={task.id}
            className='flex shadow-md rounded-lg p-4 bg-white my-2 items-center'
            onClick={handleNavigate}
        >
            <Checkbox size='large' className="" checked={task.completed} onChange={() => handleCheck(task.id)} />
            <div className='grow'>
                <p>{task.title}</p>
            </div>
            {task.pending ? (
                <button onClick={() => { handlePending(task.id) }} className='rounded-md bg-yellow-100 text-yellow-500 mr-4 p-2'>In Progress</button>
            ) : (
                task.completed ? (
                    <button className='rounded-md bg-green-100 text-green-500 mr-4 p-2'>Completed</button>
                ) : (
                    <button onClick={() => handlePending(task.id)} className='rounded-md bg-gray-100 text-gray-500 mr-4 p-2'>Not Yet</button>
                )
            )}
            <button type='submit' onClick={() => handleDelete(task.id)} className='bg-[#B0D4B8] hover:bg-[#A4C3A2] text-[#5D7B6F] p-2 rounded-md'>Delete</button>
        </li>
    )
}

export default Item