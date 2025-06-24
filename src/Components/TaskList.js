import React from 'react'
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';

const TaskList = ({ tasks, handleCheck, handleDelete, handlePending }) => {
    return (
        <main className='grow flex flex-col bg-gray-100 p-6'>
            <div className='flex justify-between items-center mb-4'>
                <h1>Task List</h1>
                <Link to="/" className='bg-blue-500 hover:bg-red-500 p-2 text-white rounded-md'>Back to Dashboard</Link>
            </div>
            <ul className='grow'>
                {tasks.map((task) => (
                    <li key={task.id} className='flex shadow-md rounded-lg p-4 bg-white m-2 items-center'>
                        <Checkbox size='large' className="" checked={task.completed} onChange={() => handleCheck(task.id)} />
                        <div className='grow'>
                            <p>{task.title}</p>
                        </div>
                        {task.pending ? <button onClick={() => { handlePending(task.id) }} className='rounded-md bg-yellow-100 text-yellow-500 mr-4 p-2'>In Progress</button>
                            : (task.completed ? <button className='rounded-md bg-green-100 text-green-500 mr-4 p-2'>Completed</button>
                                : <button onClick={() => handlePending(task.id)} className='rounded-md bg-gray-100 text-gray-500 mr-4 p-2'>Not Yet</button>)
                        }
                        <button type='submit' onClick={() => handleDelete(task.id)} className='bg-blue-500 hover:bg-red-500 p-2 text-white rounded-md'>Delete</button>
                    </li>
                ))}
            </ul>
        </main>
    )
}

export default TaskList