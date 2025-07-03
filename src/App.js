import React from 'react'
import Header from './Components/Header';
import Footer from './Components/Footer';
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
import { GET, POST, PATCH, DELETE } from './api/api';
import PrivateRoute from './Components/Auth/PrivateRoute';
import PublicRoute from './Components/Auth/PublicRoute';
import Login from './Components/Login';
import Register from './Components/Register';


function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  const [tasks, setTasks] = useState([]);
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

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GET();
        setTasks(response.data);
        setFetchError(null)
      } catch (error) {
        console.log('Error fetching data:', error);
        setFetchError(error.message);
      }
    };
    fetchData();
  }, []);
  const addTask = async (task) => {
    const id = String((tasks.length ? Number(tasks[tasks.length - 1].id) + 1 : 1));
    const newTaskObj = {
      id: id,
      title: task.title,
      description: task.description,
      completed: false,
      pending: false,
    }
    const response = await POST(newTaskObj);
    setTasks([...tasks, response.data]);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask({
      id: 0,
      title: '',
      description: ''
    })
  }
  // const saveAndSetTasks = (newTasks) => {
  //   setTasks(newTasks);
  //   localStorage.setItem('tasks', JSON.stringify(newTasks));
  // }

  const handleCheck = async (id) => {
    const task = tasks.find(task => task.id === id);
    if (!task) return;
    const completed = !task.completed;
    const pending = completed ? false : task.pending;

    await PATCH(id, { completed, pending });

    setTasks(tasks.map(t =>
      t.id === id ? { ...t, completed, pending } : t
    ));
  };

  const handleDelete = async (id) => {
    const listTasks = tasks.filter((task) => task.id !== id);
    await DELETE(id);
    setTasks(listTasks);
  };

  const handlePending = async (id) => {
    const task = tasks.find(task => task.id === id);
    if (!task || task.completed) return;
    const pending = !task.pending;
    await PATCH(id, { pending });
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, pending } : t
    ));
  };

  const handleEdit = async (id, newTitle, newDescription) => {
    await PATCH(id, { title: newTitle, description: newDescription });
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, title: newTitle, description: newDescription } : task
    ));
  };
  return (
    <div className='flex flex-col justify-between h-screen'>
      {isAuthPage ? (
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
      ) : (
        <>
          <Header />
          <div className="flex flex-col sm:flex-row grow bg-[#EAE7D6]">
            <SideBar />
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
                    />
                  </PrivateRoute>}
                />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
