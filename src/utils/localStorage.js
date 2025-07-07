// src/utils/localStorage.js

const TASKS_KEY = 'taskTracker_tasks';
const USER_KEY = 'taskTracker_user';

// Task management
export const getTasks = () => {
  try {
    const tasks = localStorage.getItem(TASKS_KEY);
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.error('Error loading tasks:', error);
    return [];
  }
};

export const saveTasks = (tasks) => {
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks:', error);
  }
};

export const clearTasks = () => {
  try {
    localStorage.removeItem(TASKS_KEY);
  } catch (error) {
    console.error('Error clearing tasks:', error);
  }
};

// User management
export const getUser = () => {
  try {
    return localStorage.getItem(USER_KEY);
  } catch (error) {
    console.error('Error loading user:', error);
    return null;
  }
};

export const saveUser = (username) => {
  try {
    localStorage.setItem(USER_KEY, username);
  } catch (error) {
    console.error('Error saving user:', error);
  }
};

export const removeUser = () => {
  try {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TASKS_KEY);
  } catch (error) {
    console.error('Error removing user:', error);
  }
};