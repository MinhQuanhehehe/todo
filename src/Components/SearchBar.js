import React from 'react'
import SearchedTasks from './SearchedTasks'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const SearchBar = ({ seaching, setSearching }) => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/searched");
    };
    return (
        <div className='flex justify-center items-center pt-6 bg-gray-100'>
            <form className='flex items-center w-full max-w-md'>
                <input
                    type='text'
                    placeholder='Search tasks...'
                    value={seaching}
                    className='border border-gray-300 rounded-md p-2 w-full'
                    onChange={(e) => setSearching(e.target.value)}
                />
                <button
                    type='submit'
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2'
                    onClick={handleSubmit}
                >Search</button>
            </form>
        </div>
    )
}

export default SearchBar