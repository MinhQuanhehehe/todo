import React from 'react'

const AddTaskForm = ({ newTask, setNewTask, handleSubmit, setAddTaskFormVisible, addTask }) => {
    return (
        <div className='fixed flex items-center justify-center min-h-screen bg-black/20 w-full z-999'>
            <form className='flex flex-col bg-white p-6 shadow-md rounded-lg w-1/2 h-1/2'>
                <div className='flex justify-between items-center'> 
                    <h2 className='text-xl font-bold'>Add New Task</h2>
                    <button className='text-gray-500 hover:text-gray-800 text-4xl font-bold align-center' 
                        onClick={() => setAddTaskFormVisible(false)}>
                        &times;
                    </button>
                </div>
                <label className='mb-2'>
                    Title:
                    <input type='text' className='border border-gray-300 rounded-md p-2 w-full' placeholder='Task Title' 
                        value={newTask.title} 
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    />
                </label>
                <label className='mb-4'>
                    Description:
                    <textarea className='border border-gray-300 rounded-md p-2 w-full' placeholder='Task Description'
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        rows={8}
                    ></textarea>
                </label>
                <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    onClick={(e) => {
                        handleSubmit(e);
                        setAddTaskFormVisible(false);
                    }}     
                >Add Task</button>
            </form>
        </div>
    )
}

export default AddTaskForm