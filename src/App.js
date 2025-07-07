// src/App.js

import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import './styles/App.css';
import { getTasks, saveTasks, getUser, saveUser, removeUser } from './utils/localStorage';

function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // Added search state

  useEffect(() => {
    const savedUser = getUser();
    if (savedUser) {
      setUser(savedUser);
      const savedTasks = getTasks();
      setTasks(savedTasks);
    }

    // Load dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  // Apply dark mode class to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const handleLogin = (username) => {
    setUser(username);
    saveUser(username);
  };

  const handleLogout = () => {
    setUser(null);
    setTasks([]);
    removeUser();
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
  };

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString()
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const updateTask = (id, updates) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, ...updates } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setEditingTask(null);
  };

  const deleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
    }
  };

  const toggleComplete = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  // Handle search term changes
  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  // Filter tasks based on current filter (all, pending, completed)
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const taskCounts = {
    all: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>
            <svg 
              className="header-icon" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            Personal Task Tracker
          </h1>
          <div className="user-info">
            <span>Welcome, {user}!</span>
            <button onClick={toggleDarkMode} className="dark-mode-toggle" title={`Switch to ${darkMode ? 'light' : 'dark'} mode`}>
              {darkMode ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 1V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 21V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4.22 4.22L5.64 5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18.36 18.36L19.78 19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4.22 19.78L5.64 18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18.36 5.64L19.78 4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <TaskForm 
            onAddTask={addTask} 
            editingTask={editingTask}
            onUpdateTask={updateTask}
            onCancelEdit={() => setEditingTask(null)}
          />
          
          <TaskFilter 
            currentFilter={filter}
            onFilterChange={setFilter}
            taskCounts={taskCounts}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
          />
          
          <TaskList 
            tasks={filteredTasks}
            onToggleComplete={toggleComplete}
            onDeleteTask={deleteTask}
            onEditTask={setEditingTask}
            searchTerm={searchTerm}
          />
        </div>
      </main>
    </div>
  );
}

export default App;