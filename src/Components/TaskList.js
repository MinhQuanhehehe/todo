import React from 'react'
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Item from './Item';

const TaskList = ({ tasks, handleCheck, handleDelete, handlePending, setAddTaskFormVisible}) => {
    return (
        <main className='grow flex flex-col bg-gray-100 p-6 h-1'>
            <div className='flex justify-between items-center mb-4'>
                <h1>Task List</h1>
                <Link to="/" className='bg-blue-500 hover:bg-red-500 p-2 text-white rounded-md'>Back to Dashboard</Link>
            </div>
            <ul className='grow flex flex-col overflow-y-auto'>
                {tasks.map((task) => (
                    <Item 
                        key={task.id} 
                        task={task} 
                        handleCheck={handleCheck} 
                        handleDelete={handleDelete} 
                        handlePending={handlePending} 
                    />
                ))}
                <li>
                    <button onClick={() => (setAddTaskFormVisible(true))} className='shadow-md rounded-lg p-4 bg-white my-2 text-center w-full '>Add Task</button>
                </li>
            </ul>
            
        </main>
    )
}

export default TaskList