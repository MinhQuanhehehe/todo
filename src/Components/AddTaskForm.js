import React from 'react'

const AddTaskForm = ({ newTask, setNewTask, handleSubmit, setAddTaskFormVisible, addTask }) => {
    return (
        <div className='fixed top-0 left-0 flex items-center justify-center min-h-screen bg-black/20 w-full z-50'>
            <form className='flex flex-col bg-white p-6 shadow-md rounded-lg w-1/2 h-1/2'
                onSubmit={(e) => {
                    handleSubmit(e);
                    setAddTaskFormVisible(false);
                }}  >
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
                        required
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
                <button type='submit' className='bg-[#B0D4B8] hover:bg-[#A4C3A2] text-[#5D7B6F] py-2 px-4 rounded'
                >Add Task</button>
            </form>
        </div>
    )
}

export default AddTaskForm