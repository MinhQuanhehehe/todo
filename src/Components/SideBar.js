import { FiHome, FiList, FiSettings, FiChevronUp, FiChevronDown, FiLogOut, FiMenu, FiCheckCircle, FiBookmark, FiUser } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from './Auth/AuthContext';
import { useLocation } from 'react-router-dom';


const SideBar = ({ user }) => {
    const [open, setOpen] = useState(true);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();
    const { logout } = useAuth();
    const location = useLocation();
    const currentPath = location.pathname;

    const isActive = (path) => currentPath === path;

    const handleLogout = () => {
        localStorage.removeItem('token');
        logout();
        toast.success('Successfully logged out!');
        navigate('/login');
    };
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 640) {
                setDrawerOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const menu = (
        <div>
            <h1 className="text-2xl font-bold text-center mt-4">Hello</h1>
            <div className="px-4 py-2">
                <div className="uppercase text-xs font-semibold text-gray-400 mt-2 mb-3 tracking-wider">
                    Main Menu
                </div>
                <ul>
                    <li>
                        <button className={`flex items-center w-full py-2 px-3 rounded hover:bg-gray-100 transition text-gray-700 ${isActive('/') ? 'font-bold bg-gray-200' : ''}`}
                            onClick={() => { navigate('/'); setDrawerOpen(false) }}
                        >
                            <FiHome className="mr-3 w-5 h-5" />
                            <span>Home</span>
                        </button>
                    </li>
                    <li>
                        <button className={`flex items-center w-full py-2 px-3 rounded hover:bg-gray-100 transition text-gray-700 ${isActive('/tasks') ? 'font-bold bg-gray-200' : ''}`}
                            onClick={() => { navigate('/tasks'); setDrawerOpen(false) }}
                        >
                            <FiList className="mr-3 w-5 h-5" />
                            <span>Task List</span>
                        </button>
                    </li>
                    <li>
                        <button className={`flex items-center w-full py-2 px-3 rounded hover:bg-gray-100 transition text-gray-700 ${isActive('/completed-tasks') ? 'font-bold bg-gray-200' : ''}`}
                            onClick={() => { navigate('/completed-tasks'); setDrawerOpen(false) }}
                        >
                            <FiCheckCircle className="mr-3 w-5 h-5" />
                            <span>Completed Tasks</span>
                        </button>
                    </li>
                    <li>
                        <button className={`flex items-center w-full py-2 px-3 rounded hover:bg-gray-100 transition text-gray-700 ${isActive('/pending-tasks') ? 'font-bold bg-gray-200' : ''}`}
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
        </div>
    )
    return (
        <>
            <div className={`sm:hidden flex justify-between border-b-2 border-[#5D7B6F] items-center mx-6`}>
                <button
                    className="sm:hidden bg-white my-2 p-2 rounded-md"
                    onClick={() => setDrawerOpen(true)}
                >
                    <FiMenu size={24} />
                </button>
                <p className='grow text-center sm:hidden font-bold'>Hello</p>
            </div>
            {drawerOpen && (
                <div className='fixed top-0 left-0 flex min-h-screen bg-black/20 w-full z-50'
                    onClick={() => setDrawerOpen(false)}
                >

                    <div className='bg-white w-3/4 sm:w-1/4 max-w-[350px] min-w-[270px] p-4 shadow-lg justify-between flex flex-col'>
                        {menu}
                        <button
                            className="flex items-center w-full py-2 px-3 rounded hover:bg-gray-100 transition text-gray-700 justify-center"
                            onClick={() => { setDrawerOpen(false) }}
                        >Exit</button>
                    </div>
                </div>
            )}
            <div className="hidden sm:block sm:w-1/4 sm:max-w-[350px] sm:min-w-[270px] bg-white">
                {menu}
            </div>
        </>
    );
}

export default SideBar