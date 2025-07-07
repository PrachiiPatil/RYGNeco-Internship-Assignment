// src/components/TaskList.js
import React, { useState, useMemo } from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onToggleComplete, onDeleteTask, onEditTask, searchTerm }) => {
  const [sortBy, setSortBy] = useState('priority'); // 'priority', 'created', 'title'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc', 'desc'

  const filteredAndSortedTasks = useMemo(() => {
    // First filter by search term
    let filteredTasks = tasks;
    
    if (searchTerm) {
      filteredTasks = tasks.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Then sort the filtered tasks
    const tasksCopy = [...filteredTasks];
    
    return tasksCopy.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'priority':
          // Lower priority number = higher importance (1 is most important)
          comparison = (a.priority || 5) - (b.priority || 5);
          break;
        case 'created':
          comparison = new Date(a.createdAt) - new Date(b.createdAt);
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'desc' ? -comparison : comparison;
    });
  }, [tasks, sortBy, sortOrder, searchTerm]);

  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      // Toggle sort order if same column
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // New column, default to ascending
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
  };

  const getSortIcon = (columnName) => {
    if (sortBy !== columnName) {
      return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m7 15 5 5 5-5"></path>
          <path d="m7 9 5-5 5 5"></path>
        </svg>
      );
    }
    
    return sortOrder === 'asc' ? (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="m7 15 5 5 5-5"></path>
      </svg>
    ) : (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="m7 9 5-5 5 5"></path>
      </svg>
    );
  };

  // Show different empty states based on whether we're searching or not
  if (filteredAndSortedTasks.length === 0) {
    return (
      <div className="task-list-container">
        <div className="empty-state">
          {searchTerm ? (
            <>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <h3>No tasks found</h3>
              <p>No tasks match your search for "<strong>{searchTerm}</strong>"</p>
              <p>Try searching for something else or check your spelling.</p>
            </>
          ) : (
            <>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14,2 14,8 20,8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10,9 9,9 8,9"></polyline>
              </svg>
              <h3>No tasks found</h3>
              <p>Add your first task to get started!</p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h3>
          Tasks ({filteredAndSortedTasks.length}
          {searchTerm && tasks.length !== filteredAndSortedTasks.length && 
            ` of ${tasks.length}`
          })
        </h3>
        
        <div className="sort-controls">
          <span className="sort-label">Sort by:</span>
          <button
            className={`sort-btn ${sortBy === 'priority' ? 'active' : ''}`}
            onClick={() => handleSortChange('priority')}
            title="Sort by priority"
          >
            Priority {getSortIcon('priority')}
          </button>
          <button
            className={`sort-btn ${sortBy === 'created' ? 'active' : ''}`}
            onClick={() => handleSortChange('created')}
            title="Sort by creation date"
          >
            Date {getSortIcon('created')}
          </button>
          <button
            className={`sort-btn ${sortBy === 'title' ? 'active' : ''}`}
            onClick={() => handleSortChange('title')}
            title="Sort by title"
          >
            Title {getSortIcon('title')}
          </button>
        </div>
      </div>
      
      <div className="task-list">
        {filteredAndSortedTasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={onToggleComplete}
            onDeleteTask={onDeleteTask}
            onEditTask={onEditTask}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;