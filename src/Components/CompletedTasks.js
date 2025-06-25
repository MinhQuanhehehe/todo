import React from 'react'
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Item from './Item';


const CompletedTasks = ({ tasks, handleCheck, handleDelete, handlePending }) => {
  return (
    <main className='grow flex flex-col bg-gray-100 p-6 h-1'>
      <div className='flex justify-between items-center mb-4'>
        <h1>Complete Task</h1>
        <Link to="/" className='bg-blue-500 hover:bg-red-500 p-2 text-white rounded-md'>Back to Dashboard</Link>
      </div>
      <ul className='grow overflow-y-auto'>
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