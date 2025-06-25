import React from 'react'
import Header from './Components/Header';
import Footer from './Components/Footer';
import Content from './Components/Content';
import CompletedTasks from './Components/CompletedTasks';
import PendingTasks from './Components/PendingTask';
import TaskList from './Components/TaskList';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AddTaskForm from './Components/AddTaskForm';
import SearchBar from './Components/SearchBar';
import SearchedTasks from './Components/SearchedTasks';
import ItemDetail from './Components/ItemDetail';
import SideBar from './Components/SideBar';



function App() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
  const [newTask, setNewTask] = useState(
    {
      id: 0,
      title: '',
      description: ''
    }
  );
  const [searching, setSearching] = useState('');
  const [addTaskFormVisible, setAddTaskFormVisible] = useState(false);
  const addTask = (task) => {
    const id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
    const newTaskObj = {
      id: id,
      title: task.title,
      description: task.description,
      completed: false,
      pending: false,
    }
    const listTasks = [...tasks, newTaskObj];
    saveAndSetTasks(listTasks);
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
  const saveAndSetTasks = (newTasks) => {
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  }

  const handleCheck = (id) => {
    const listTasks = tasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task)
    const updateTasks = listTasks.map((task) =>
      (task.completed ? { ...task, pending: false } : task)
    );
    saveAndSetTasks(updateTasks);
  }

  const handleDelete = (id) => {
    const listTasks = tasks.filter((task) => task.id !== id)
    saveAndSetTasks(listTasks);
  }
  const handlePending = (id) => {
    const listTasks = tasks.map((task) => task.id === id ? (!task.completed ? { ...task, pending: !task.pending } : task) : task);
    saveAndSetTasks(listTasks);
  }

  const handleEdit = (id, newTitle, newDescription) => {
  const newTasks = tasks.map(task =>
    task.id === id ? { ...task, title: newTitle, description: newDescription } : task
  );
  saveAndSetTasks(newTasks);
};
  return (
    <div className='flex flex-col justify-between h-screen'>
      <button onClick={() => (setAddTaskFormVisible(true))} className='fixed bottom-20 right-10 bg-blue-500 hover:bg-green-500 p-9 text-white rounded-2xl m-2 shadow-md'>Add</button>
      {addTaskFormVisible && <AddTaskForm
        newTask={newTask}
        setNewTask={setNewTask}
        handleSubmit={handleSubmit}
        setAddTaskFormVisible={setAddTaskFormVisible}
        addTask={addTask}
      />}
      <Header />
    <div className=" flex grow bg-gray-100">
      <SideBar />
      <div className="flex flex-col grow">
        <SearchBar
          searching={searching}
          setSearching={setSearching}
        />
        <Routes>
          <Route path='/' element={<Content />}></Route>
          <Route path="/itemdetail/:id" element={
            <ItemDetail
              handleCheck={handleCheck}
              handleDelete={handleDelete}
              handlePending={handlePending}
              handleEdit={handleEdit}
              tasks={tasks}
            />} />
          <Route path="/searched" element={
            <SearchedTasks
              searching={searching}
              tasks={tasks}
              handleCheck={handleCheck}
              handleDelete={handleDelete}
              handlePending={handlePending}
              setSearching={setSearching}
            />}
          />
          <Route path="/tasks" element={
            <TaskList
              tasks={tasks}
              handleCheck={handleCheck}
              handleDelete={handleDelete}
              handlePending={handlePending}
              setAddTaskFormVisible={setAddTaskFormVisible}
            />}
          />
          <Route path="/completed-tasks" element={
            <CompletedTasks
              tasks={tasks}
              handleCheck={handleCheck}
              handleDelete={handleDelete}
              handlePending={handlePending}
            />}
          />
          <Route path="/pending-tasks" element={
            <PendingTasks
              tasks={tasks}
              handleCheck={handleCheck}
              handleDelete={handleDelete}
              handlePending={handlePending}
            />}
          />
        </Routes>
      </div>
    </div>
    <Footer />
    </div>
  );
}

export default App;
