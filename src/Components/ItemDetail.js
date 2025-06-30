import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Checkbox from '@mui/material/Checkbox';

const ItemDetail = ({ handleCheck, handleDelete, handlePending, handleEdit, tasks }) => {
    const { id } = useParams();
    const task = tasks.find(t => t.id === id);
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task ? task.title : '');
    const [editDescription, setEditDescription] = useState(task ? task.description : '');
    console.log('tasks in ItemDetail:', tasks);
    console.log('current task:', task);
    if (!task) return <div className='flex flex-col shadow-md rounded-lg p-4 bg-white m-6 items-center'>
        <div>Not Found</div>
    </div>;

    const handleSave = () => {
        handleEdit(task.id, editTitle, editDescription);
        setIsEditing(false);
    };

    return (
        <div className='flex flex-col shadow-md rounded-lg p-4 bg-white m-6 items-center'>
            <div className='flex justify-between items-center w-full pb-2 mb-2 border-b-2'>
                <h1>Task Detail</h1>
                <Link to="/" className='bg-blue-500 hover:bg-red-500 p-2 text-white rounded-md'>Back to Dashboard</Link>
            </div>
            <div className='flex w-full mx-6 items-center justify-between'>
                <Checkbox size='large' checked={task.completed} onChange={() => handleCheck(task.id)}/>
                <div className='grow'>
                    <div className='grow mr-4'>
                        {isEditing ? (
                            <>
                                <input
                                    className="border p-2 rounded-md w-full"
                                    value={editTitle}
                                    onChange={e => setEditTitle(e.target.value)}
                                />
                            </>
                        ) : (
                            <p>{task.title}</p>
                        )}
                    </div>
                </div>
                {task.pending ? (
                    <button onClick={() => handlePending(task.id)} className='rounded-md bg-yellow-100 text-yellow-500 mr-4 p-2'>In Progress</button>
                ) : (
                    task.completed ? (
                        <button className='rounded-md bg-green-100 text-green-500 mr-4 p-2'>Completed</button>
                    ) : (
                        <button onClick={() => handlePending(task.id)} className='rounded-md bg-gray-100 text-gray-500 mr-4 p-2'>Not Yet</button>
                    )
                )}
                <button type='submit' onClick={() => handleDelete(task.id)} className='bg-[#B0D4B8] hover:bg-[#A4C3A2] text-[#5D7B6F] p-2 rounded-md'>Delete</button>
            </div>
            <div className='flex flex-col w-full mx-6'>
                <p><strong>Description</strong></p>
                {isEditing ? (
                    <textarea
                        className="border p-2 rounded-md w-full"
                        value={editDescription}
                        onChange={e => setEditDescription(e.target.value)}
                    />
                ) : (
                    <p>{task.description}</p>
                )}
            </div>
            <div className="flex gap-2 mt-4">
                {isEditing ? (
                    <>
                        <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
                        <button onClick={() => setIsEditing(false)} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                    </>
                ) : (
                    <button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white px-4 py-2 rounded">Edit</button>
                )}
            </div>
        </div>
    )
}

export default ItemDetail;