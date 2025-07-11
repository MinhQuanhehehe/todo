import React from 'react'
import { Link } from 'react-router-dom';
import Item from './Item';

const TaskList = ({ tasks, handleCheck, handleDelete, handlePending, setAddTaskFormVisible, loadingCheckIds, loadingPendingIds, loadingDeleteIds }) => {
    return (
        <main className=' grow flex flex-col bg-[#EAE7D6] p-6'>
            <div className='flex justify-between items-center mb-4'>
                <h1 className='font-bold text-xl'>Task List</h1>
                <Link to="/" className='bg-[#B0D4B8] hover:bg-[#A4C3A2] text-[#5D7B6F] p-2 duration-300 rounded-md'>Back to Dashboard</Link>
            </div>
            <ul className='overflow-y-auto grow sm:h-10'>
                {tasks.length != 0 ? (
                    tasks.map((task) => (
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
                    ))
                ) : (
                    <p>No Task Found</p>
                )}
                <li>
                    <button onClick={() => (setAddTaskFormVisible(true))} className='shadow-md rounded-lg p-4 bg-white my-2 text-center w-full '>Add Task</button>
                </li>
            </ul>
        </main>
    )
}

export default TaskList