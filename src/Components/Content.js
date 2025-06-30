import React from 'react'
import { Link } from 'react-router-dom';

const Content = () => {
    return (
        <main className='grow flex flex-col bg-[#EAE7D6] p-6'>
            <div className='flex justify-between items-center mb-4'>
                <h1 className='font-bold'>Dash Board</h1>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-6 grow'>
                <Link to="/tasks" className="text-black ">
                    <div className="p-4 bg-[#bad8c1] shadow-md rounded-lg flex items-center justify-center h-full hover:bg-gray-200">
                        Task List
                    </div>
                </Link>
                <Link to="/completed-tasks" className="text-black">
                    <div className="p-4 bg-[#bad8c1] shadow-md rounded-lg flex items-center justify-center h-full hover:bg-gray-200">
                        Completed Tasks
                    </div>
                </Link>
                <Link to="/pending-tasks" className="text-black">
                    <div className="p-4 bg-[#bad8c1] shadow-md rounded-lg flex items-center justify-center h-full hover:bg-gray-200">
                        Pending Tasks
                    </div>
                </Link>
            </div>
        </main>
    )
}

export default Content