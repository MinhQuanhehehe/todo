import React from 'react'
import Header from './Components/Header';
import Content from './Components/Content';
import CompletedTasks from './Components/CompletedTasks';
import PendingTasks from './Components/PendingTask';
import TaskList from './Components/TaskList';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AddTaskForm from './Components/AddTaskForm';
import SearchBar from './Components/SearchBar';
import SearchedTasks from './Components/SearchedTasks';
import ItemDetail from './Components/ItemDetail';
import SideBar from './Components/SideBar';
import { GET, GET_USER, POST, PATCH, DELETE } from './api/api';
import PrivateRoute from './Components/Auth/PrivateRoute';
import PublicRoute from './Components/Auth/PublicRoute';
import Login from './Components/Login';
import Register from './Components/Register';
import { toast, ToastContainer } from 'react-toastify';
import Loading from './Components/Loading';
import { useAuth } from './Components/Auth/AuthContext';
import UserList from './Components/UserList';
import Footer from './Components/Footer';


function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const { userId } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [newTask, setNewTask] = useState(
    {
      id: 0,
      title: '',
      description: ''
    }
  );
  const [searching, setSearching] = useState('');
  const [addTaskFormVisible, setAddTaskFormVisible] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [loadingCheckIds, setLoadingCheckIds] = useState({});
  const [loadingPendingIds, setLoadingPendingIds] = useState({});
  const [loadingDeleteIds, setLoadingDeleteIds] = useState({});
  const [loadingUserIds, setLoadingUserIds] = useState({})

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      setLoading(true);
      try {
        const res = await GET_USER(userId);
        const resUsers = await GET();
        setUsers(resUsers.data);
        setUser(res.data);
        setTasks(res.data.tasks || []);
        setFetchError(null);
      } catch (error) {
        setFetchError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  const handleDeleteUser = async (id) => {
    if (!userId || loadingCheckIds[id]) return;
    setLoadingUserIds(prev => ({ ...prev, [id]: true }));
    try {
      await DELETE(id);
      toast.success('User deleted!');
      setUsers(prev => prev.filter(user => user.id !== id));
    } catch (error) {
      toast.error('Delete failed!');
    } finally {
      setLoadingUserIds(prev => ({ ...prev, [id]: false }));
    }
  }

  const addTask = async (task) => {
    if (!userId) return;
    const res = await GET_USER(userId);
    const user = res.data;
    const id = user.tasks.length ? Math.max(...user.tasks.map(t => t.id)) + 1 : 1;
    const newTaskObj = {
      id,
      title: task.title.trim(),
      description: task.description.trim(),
      completed: false,
      pending: false,
    };
    const newTasks = [...user.tasks, newTaskObj];
    await PATCH(userId, { tasks: newTasks });
    toast.success('Success!');
    setTasks(newTasks);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask({
      id: 0,
      title: '',
      description: ''
    });
  };
  // const saveAndSetTasks = (newTasks) => {
  //   setTasks(newTasks);
  //   localStorage.setItem('tasks', JSON.stringify(newTasks));
  // }

  const handleCheck = async (id) => {
    if (!userId || loadingCheckIds[id]) return;
    setLoadingCheckIds(prev => ({ ...prev, [id]: true }));
    try {
      const res = await GET_USER(userId);
      const user = res.data;
      const newTasks = user.tasks.map(task => {
        if (task.id === id) {
          const completed = !task.completed;
          const pending = completed ? false : task.pending;
          return { ...task, completed, pending };
        }
        return task;
      });
      await PATCH(userId, { tasks: newTasks });
      toast.success('Success!');
      setTasks(newTasks);
    } catch (error) {
      toast.error('Error!');
    } finally {
      setLoadingCheckIds(prev => ({ ...prev, [id]: false }));
    }
  };

  const handleDelete = async (id) => {
    if (!userId || loadingDeleteIds[id]) return;
    setLoadingDeleteIds(prev => ({ ...prev, [id]: true }));

    try {
      const res = await GET_USER(userId);
      const user = res.data;
      const newTasks = user.tasks.filter((task) => task.id !== id);
      await PATCH(userId, { tasks: newTasks });
      toast.success('Success!');
      setTasks(newTasks);
    } catch (error) {
      toast.error('Error!');
    } finally {
      setLoadingDeleteIds(prev => ({ ...prev, [id]: false }));
    }
  };

  const handlePending = async (id) => {
    if (!userId || loadingPendingIds[id]) return;
    setLoadingPendingIds(prev => ({ ...prev, [id]: true }));
    console.log(loadingPendingIds[id]);
    try {
      const res = await GET_USER(userId);
      const user = res.data;
      const newTasks = user.tasks.map(task => {
        if (task.id === id && !task.completed) {
          return { ...task, pending: !task.pending };
        }
        return task;
      });
      await PATCH(userId, { tasks: newTasks });
      toast.success('Success!');
      setTasks(newTasks);
    } catch (error) {
      toast.error('Có lỗi xảy ra!');
    } finally {
      setLoadingPendingIds(prev => ({ ...prev, [id]: false }));
    }
  };

  const handleEdit = async (id, newTitle, newDescription) => {
    if (!userId) return;
    const res = await GET_USER(userId);
    const user = res.data;
    const newTasks = user.tasks.map(task =>
      task.id === id ? { ...task, title: newTitle, description: newDescription } : task
    );
    await PATCH(userId, { tasks: newTasks });
    toast.success('Success!');
    setTasks(newTasks);
  };

  return (
    <>
      {loading && (
        <Loading />
      )}
      {!loading && (
        <div className='flex flex-col justify-between h-screen'>
          {isAuthPage ? (
            <>
              <Routes>
                <Route path="/login" element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                } />
                <Route path="/register" element={
                  <PublicRoute>
                    <Register />
                  </PublicRoute>
                } />
              </Routes>
              <ToastContainer />
            </>
          ) : (
            <>
              {user && user.role === 'admin' ? (
                <>
                  <Header />
                  <Routes>
                    <Route path='/' element={
                      <PrivateRoute>
                        <UserList
                          users={users.filter((u) => (u.role == 'user'))}
                          setUsers={setUsers}
                          loadingUserIds={loadingUserIds}
                          handleDeleteUser={handleDeleteUser}
                        />
                      </PrivateRoute>}>
                    </Route>
                  </Routes>
                  <Footer users={users.filter((u) => (u.role == 'user'))} />
                </>
              ) : (
                <>
                  <Header />
                  <div className="flex flex-col sm:flex-row grow bg-[#EAE7D6]">
                    <SideBar user={user} />
                    <div className="flex flex-col grow">
                      <button onClick={() => (setAddTaskFormVisible(true))} className='fixed bottom-10 right-10 bg-[#8fb898] hover:bg-[#A4C3A2] text-[#5D7B6F] p-9 rounded-2xl m-2 shadow-md'>Add</button>
                      {addTaskFormVisible && <AddTaskForm
                        newTask={newTask}
                        setNewTask={setNewTask}
                        handleSubmit={handleSubmit}
                        setAddTaskFormVisible={setAddTaskFormVisible}
                        addTask={addTask}
                      />}
                      <SearchBar
                        searching={searching}
                        setSearching={setSearching}
                      />
                      <Routes>
                        <Route path='/' element={
                          <PrivateRoute>
                            <Content />
                          </PrivateRoute>
                        } />
                        <Route path="/itemdetail/:id" element={
                          <PrivateRoute>
                            <ItemDetail
                              handleCheck={handleCheck}
                              handleDelete={handleDelete}
                              handlePending={handlePending}
                              handleEdit={handleEdit}
                              tasks={tasks}
                              loadingCheckIds={loadingCheckIds}
                              loadingPendingIds={loadingPendingIds}
                              loadingDeleteIds={loadingDeleteIds}
                            />
                          </PrivateRoute>} />
                        <Route path="/searched" element={
                          <PrivateRoute>
                            <SearchedTasks
                              searching={searching}
                              tasks={tasks}
                              handleCheck={handleCheck}
                              handleDelete={handleDelete}
                              handlePending={handlePending}
                              setSearching={setSearching}
                              loadingCheckIds={loadingCheckIds}
                              loadingPendingIds={loadingPendingIds}
                              loadingDeleteIds={loadingDeleteIds}
                            />
                          </PrivateRoute>}
                        />
                        <Route path="/tasks" element={
                          <PrivateRoute>
                            <TaskList
                              tasks={tasks}
                              handleCheck={handleCheck}
                              handleDelete={handleDelete}
                              handlePending={handlePending}
                              setAddTaskFormVisible={setAddTaskFormVisible}
                              loadingCheckIds={loadingCheckIds}
                              loadingPendingIds={loadingPendingIds}
                              loadingDeleteIds={loadingDeleteIds}
                            />
                          </PrivateRoute>}
                        />
                        <Route path="/completed-tasks" element={
                          <PrivateRoute>
                            <CompletedTasks
                              tasks={tasks}
                              handleCheck={handleCheck}
                              handleDelete={handleDelete}
                              handlePending={handlePending}
                              loadingCheckIds={loadingCheckIds}
                              loadingPendingIds={loadingPendingIds}
                              loadingDeleteIds={loadingDeleteIds}
                            />
                          </PrivateRoute>}
                        />
                        <Route path="/pending-tasks" element={
                          <PrivateRoute>
                            <PendingTasks
                              tasks={tasks}
                              handleCheck={handleCheck}
                              handleDelete={handleDelete}
                              handlePending={handlePending}
                              loadingCheckIds={loadingCheckIds}
                              loadingPendingIds={loadingPendingIds}
                              loadingDeleteIds={loadingDeleteIds}
                            />
                          </PrivateRoute>}
                        />
                      </Routes>
                    </div>
                  </div>
                  <ToastContainer />
                </>)}
            </>
          )}
        </div>)}
    </>
  );
}

export default App;
