import { FiUser, FiList, FiSettings, FiChevronUp, FiChevronDown, FiStar } from 'react-icons/fi';
import { useState } from 'react';

const Header = () => {
    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <header className="w-1/3 min-w-[260px] bg-white shadow-md">
            <h1 className="text-2xl font-bold text-center my-4">Hello</h1>
            <div className="px-4 py-2">
                <div className="uppercase text-xs font-semibold text-gray-400 mt-2 mb-3 tracking-wider">
                    Main Menu
                </div>
                <ul>
                    <li>
                        <button className="flex items-center w-full py-2 px-3 rounded hover:bg-gray-100 transition text-gray-700">
                            <FiUser className="mr-3 w-5 h-5" />
                            <span>Profile</span>
                        </button>
                    </li>
                    <li>
                        <button className="flex items-center w-full py-2 px-3 rounded hover:bg-gray-100 transition text-gray-700">
                            <FiList className="mr-3 w-5 h-5" />
                            <span>Task List</span>
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setOpen(!open)}
                            className="flex items-center w-full py-2 px-3 rounded hover:bg-gray-100 transition text-gray-700"
                        >
                            <FiSettings className="mr-3 w-5 h-5" />
                            <span className="flex-1">Setting</span>
                            {open ? <FiChevronUp /> : <FiChevronDown />}
                        </button>
                        {open && (
                            <ul className="pl-8">
                                <li>
                                    <button className="flex items-center w-full py-2 px-3 rounded hover:bg-gray-100 transition text-gray-700">
                                        <FiStar className="mr-3 w-5 h-5" />
                                        <span>Starred</span>
                                    </button>
                                </li>
                            </ul>
                        )}
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default Header