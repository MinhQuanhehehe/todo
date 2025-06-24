import React from 'react'
import Header from './Components/Header';
import Content from './Components/Content';
import CompletedTasks from './Components/CompletedTasks';
import PendingTasks from './Components/PendingTask';
import TaskList from './Components/TaskList';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import AddTaskForm from './Components/AddTaskForm';

function App() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
  const [newTask, setNewTask] = useState(
    {
      id: 0,
      title: '',
      description: ''
    }
  );
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
  return (
    <div className=" flex min-h-screen bg-gray-100">
      <Header />
      <button onClick={() => (setAddTaskFormVisible(true))} className='fixed bottom-5 right-5 bg-blue-500 hover:bg-green-500 p-2 text-white rounded-md m-2'>Add</button>
      {addTaskFormVisible && <AddTaskForm
        newTask={newTask}
        setNewTask={setNewTask}
        handleSubmit={handleSubmit}
        setAddTaskFormVisible={setAddTaskFormVisible}
        addTask={addTask}
      />}
      <Routes>
        <Route path='/' element={<Content />}></Route>
        <Route path="/tasks" element={
          <TaskList
            tasks={tasks}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
            handlePending={handlePending}
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
  );
}

export default App;
