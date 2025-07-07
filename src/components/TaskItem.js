// src/components/TaskItem.js
import React from 'react';

const TaskItem = ({ task, onToggleComplete, onDeleteTask, onEditTask }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPriorityLabel = (priorityValue) => {
    if (priorityValue <= 2) return 'Very High';
    if (priorityValue <= 4) return 'High';
    if (priorityValue <= 6) return 'Medium';
    if (priorityValue <= 8) return 'Low';
    return 'Very Low';
  };

  const getPriorityColor = (priorityValue) => {
    if (priorityValue <= 2) return '#dc2626'; // Red
    if (priorityValue <= 4) return '#ea580c'; // Orange
    if (priorityValue <= 6) return '#d97706'; // Amber
    if (priorityValue <= 8) return '#65a30d'; // Lime
    return '#16a34a'; // Green
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : 'pending'}`}>
      <div className="task-content">
        <div className="task-header">
          <div className="task-toggle">
            <button
              className={`toggle-btn ${task.completed ? 'completed' : 'pending'}`}
              onClick={() => onToggleComplete(task.id)}
              title={task.completed ? 'Mark as pending' : 'Mark as completed'}
            >
              <div className="toggle-slider"></div>
            </button>
          </div>
          
          <div className="task-info">
            <h3 className="task-title">{task.title}</h3>
            {task.description && (
              <p className="task-description">{task.description}</p>
            )}
            <span className="task-date">
              Created: {formatDate(task.createdAt)}
            </span>
          </div>
        </div>
        
        <div className="task-right-section">
          <div className="task-priority">
            <span 
              className="priority-badge"
              style={{ 
                backgroundColor: getPriorityColor(task.priority || 5),
                color: 'white'
              }}
            >
              {task.priority || 5}
            </span>
            <span 
              className="priority-text"
              style={{ color: getPriorityColor(task.priority || 5) }}
            >
              {getPriorityLabel(task.priority || 5)}
            </span>
          </div>
          
          <div className="task-actions">
            <button
              onClick={() => onEditTask(task)}
              className="btn btn-edit"
              title="Edit task"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="m18.5 2.5 3 3L12 15l-4 1 1-4z"></path>
              </svg>
              Edit
            </button>
            <button
              onClick={() => onDeleteTask(task.id)}
              className="btn btn-delete"
              title="Delete task"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3,6 5,6 21,6"></polyline>
                <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,2h4a2,2 0 0,1 2,2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
              Delete
            </button>
          </div>
        </div>
      </div>
      
      <div className="task-status">
        <span className={`status-badge ${task.completed ? 'completed' : 'pending'}`}>
          {task.completed ? 'Completed' : 'Pending'}
        </span>
      </div>
    </div>
  );
};

export default TaskItem;