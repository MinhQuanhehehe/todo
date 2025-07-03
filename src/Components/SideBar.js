import { FiHome, FiList, FiSettings, FiChevronUp, FiChevronDown, FiLogOut, FiMenu, FiCheckCircle, FiBookmark, FiUser } from 'react-icons/fi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from './Auth/AuthContext';


const SideBar = () => {
    const [open, setOpen] = useState(true);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        localStorage.removeItem('token');
        logout();
        toast.success('Đăng xuất thành công!');
        navigate('/login');
    };
    const menu = (
        <>
            <h1 className="text-2xl font-bold text-center mt-4">Hello</h1>
            <div className="px-4 py-2">
                <div className="uppercase text-xs font-semibold text-gray-400 mt-2 mb-3 tracking-wider">
                    Main Menu
                </div>
                <ul>
                    <li>
                        <button className="flex items-center w-full py-2 px-3 rounded hover:bg-gray-100 transition text-gray-700"
                            onClick={() => { navigate('/'); setDrawerOpen(false) }}
                        >
                            <FiHome className="mr-3 w-5 h-5" />
                            <span>Home</span>
                        </button>
                    </li>
                    <li>
                        <button className="flex items-center w-full py-2 px-3 rounded hover:bg-gray-100 transition text-gray-700"
                            onClick={() => { navigate('/tasks'); setDrawerOpen(false) }}
                        >
                            <FiList className="mr-3 w-5 h-5" />
                            <span>Task List</span>
                        </button>
                    </li>
                    <li>
                        <button className="flex items-center w-full py-2 px-3 rounded hover:bg-gray-100 transition text-gray-700"
                            onClick={() => { navigate('/completed-tasks'); setDrawerOpen(false) }}
                        >
                            <FiCheckCircle className="mr-3 w-5 h-5" />
                            <span>Completed Tasks</span>
                        </button>
                    </li>
                    <li>
                        <button className="flex items-center w-full py-2 px-3 rounded hover:bg-gray-100 transition text-gray-700"
                            onClick={() => { navigate('/pending-tasks'); setDrawerOpen(false) }}
                        >
                            <FiBookmark className="mr-3 w-5 h-5" />
                            <span>In Progress Tasks</span>
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setOpen(!open)}
                            className="flex items-center w-full py-2 px-3 rounded hover:bg-gray-100 transition text-gray-700"
                        >
                            <FiSettings className="mr-3 w-5 h-5" />
                            <span className="flex grow">Setting</span>
                            {open ? <FiChevronUp /> : <FiChevronDown />}
                        </button>
                        {open && (
                            <ul className="pl-8">
                                <li>
                                    <button className="flex items-center w-full py-2 px-3 rounded hover:bg-gray-100 transition text-gray-700"
                                        onClick={handleLogout}
                                    >
                                        <FiLogOut className="mr-3 w-5 h-5" />
                                        <span>Log Out</span>
                                    </button>
                                </li>
                            </ul>
                        )}
                    </li>
                </ul>
            </div>
        </>
    )
    return (
        <>
            <div className='sm:hidden flex justify-between border-b-2 border-[#5D7B6F] items-center mx-6'>
                <button
                    className="sm:hidden bg-white my-2 p-2 rounded-md"
                    onClick={() => setDrawerOpen(true)}
                >
                    <FiMenu size={24} />
                </button>
                <p className='grow text-center sm:hidden'>DOOOOOOO ITTTTTTT</p>
            </div>
            {drawerOpen && (
                <div className='fixed top-0 left-0 flex items-center justify-center min-h-screen bg-black/20 w-full z-50'>
                    <div className='flex flex-col bg-white p-6 shadow-md rounded-lg w-[80%] h-full'>
                        {menu}
                        <button
                            className="flex items-center w-full py-2 px-3 rounded hover:bg-gray-100 transition text-gray-700 justify-center"
                            onClick={() => { setDrawerOpen(false) }}
                        >Exit</button>
                    </div>
                </div>
            )}
            <div className="hidden sm:block sm:w-1/3 sm:max-w-[400px] bg-white">
                {menu}
            </div>
        </>
    );
}

export default SideBar