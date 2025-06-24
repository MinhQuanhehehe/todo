import React from 'react'

const AddTaskForm = () => {
    return (
        <div className='fixed flex items-center justify-center min-h-screen bg-black/20 w-full'>
            <form className='flex flex-col bg-white p-6 shadow-md rounded-lg w-1/2 h-1/2'>
                <h2 className='text-xl font-bold mb-4'>Add New Task</h2>
                <label className='mb-2'>
                    Title:
                    <input type='text' className='border border-gray-300 rounded-md p-2 w-full' placeholder='Task Title' />
                </label>
                <label className='mb-4'>
                    Description:
                    <textarea className='border border-gray-300 rounded-md p-2 w-full' placeholder='Task Description'></textarea>
                </label>
                <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Add Task</button>
            </form>
        </div>
    )
}

export default AddTaskForm