import React from 'react'
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Item from './Item';


const PendingTasks = ({ tasks, handleCheck, handleDelete, handlePending }) => {
  return (
    <main className='grow flex flex-col p-6 h-1'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='font-bold text-xl'>In Progress Task</h1>
        <Link to="/" className='bg-[#B0D4B8] hover:bg-[#A4C3A2] text-[#5D7B6F] p-2 rounded-md'>Back to Dashboard</Link>
      </div>
      <ul className='overflow-y-auto grow sm:h-10'>
        {tasks.filter((task) => (task.pending)).map((task) => (
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

export default PendingTasks