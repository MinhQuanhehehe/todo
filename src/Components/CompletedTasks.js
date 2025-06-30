import React from 'react'
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Item from './Item';


const CompletedTasks = ({ tasks, handleCheck, handleDelete, handlePending }) => {
  return (
    <main className='grow flex flex-col p-6 h-1'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='font-bold'>Complete Task</h1>
        <Link to="/" className='bg-[#B0D4B8] hover:bg-[#A4C3A2] text-[#5D7B6F] p-2  text-white rounded-md'>Back to Dashboard</Link>
      </div>
      <ul>
        {tasks.filter((task) => (task.completed)).map((task) => (
          <Item
            key={task.id}
            task={task}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
            handlePending={handlePending}
          />
        ))}
      </ul>
    </main>
  )
}

export default CompletedTasks