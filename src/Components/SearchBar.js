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
        <div className='flex justify-center items-center p-6 border-b-2 border-[#5D7B6F] mx-6'>
            <form className='flex items-center w-full'>
                <input
                    type='text'
                    placeholder='Search tasks...'
                    onChange={(e) => setSearching(e.target.value)}
                    value={seaching}
                    className='border border-gray-300 rounded-md p-2 w-full'
                />
                <button
                    type='submit'
                    className='bg-[#B0D4B8] hover:bg-[#A4C3A2] text-[#5D7B6F] py-2 px-4 rounded ml-2'
                    onClick={handleSubmit}
                >Search</button>
            </form>
        </div>
    )
}

export default SearchBar